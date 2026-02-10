import Phaser from 'phaser';
import { showMissionResults } from '../utils/missionResults';

interface Card {
  id: number;
  value: number;
  sprite: Phaser.GameObjects.Rectangle;
  text: Phaser.GameObjects.Text;
  targetPosition: number;
}

export class PunchCardMinigame extends Phaser.Scene {
  private cards: Card[] = [];
  private targetSlots: number[] = [];
  private timerText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private timeRemaining: number = 60;
  private totalCards: number = 8;
  private missionId: string = '';

  constructor() {
    super({ key: 'PunchCardMinigame' });
  }

  init(data: { missionId: string }): void {
    this.missionId = data.missionId || '';
  }

  create(): void {
    const width = this.cameras.main.width;

    this.cameras.main.setBackgroundColor('#1a1a1a');

    // Title
    this.add.text(width / 2, 50, 'PUNCH CARD SORTING', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Instructions
    this.add.text(width / 2, 100, 'Drag cards into correct numerical order (left to right)', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Timer and score
    this.timerText = this.add.text(100, 150, 'Time: 60', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });

    this.scoreText = this.add.text(width - 200, 150, 'Accuracy: 0%', {
      fontSize: '20px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });

    // Create target slots
    const slotY = 400;
    const slotWidth = 80;
    const slotSpacing = 100;
    const startX = width / 2 - (this.totalCards * slotSpacing) / 2;

    for (let i = 0; i < this.totalCards; i++) {
      const slotX = startX + i * slotSpacing;
      this.add.rectangle(slotX, slotY, slotWidth, 120, 0x333333);
      this.add.rectangle(slotX, slotY, slotWidth, 120, 0x00ff00).setStrokeStyle(2);

      this.add.text(slotX, slotY + 80, `${i + 1}`, {
        fontSize: '14px',
        color: '#888888',
        fontFamily: 'monospace',
      }).setOrigin(0.5);

      this.targetSlots.push(slotX);
    }

    // Create cards in random positions
    this.createCards();

    // Start timer
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  private createCards(): void {
    const width = this.cameras.main.width;
    const cardNumbers = Array.from({ length: this.totalCards }, (_, i) => i + 1);
    
    // Shuffle
    for (let i = cardNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardNumbers[i], cardNumbers[j]] = [cardNumbers[j], cardNumbers[i]];
    }

    const startY = 250;
    const spacing = 100;
    const startX = width / 2 - (this.totalCards * spacing) / 2;

    cardNumbers.forEach((num, index) => {
      const x = startX + index * spacing;
      const y = startY;

      const cardSprite = this.add.rectangle(x, y, 80, 120, 0xaa8844);
      cardSprite.setStrokeStyle(2, 0x000000);

      const cardText = this.add.text(x, y, num.toString(), {
        fontSize: '32px',
        color: '#000000',
        fontFamily: 'monospace',
      }).setOrigin(0.5);

      const card: Card = {
        id: index,
        value: num,
        sprite: cardSprite,
        text: cardText,
        targetPosition: num - 1,
      };

      cardSprite.setInteractive({ useHandCursor: true, draggable: true });
      cardSprite.setData('card', card);

      this.cards.push(card);
    });

    // Drag events with better feedback
    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
      const card = gameObject.getData('card') as Card;
      card.sprite.setAlpha(0.8);
      card.sprite.setDepth(100); // Bring to front
      card.text.setDepth(101);
      // Slight scale up for visual feedback
      card.sprite.setScale(1.1);
      card.text.setScale(1.1);
    });

    this.input.on('drag', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
      const card = gameObject.getData('card') as Card;
      card.sprite.x = dragX;
      card.sprite.y = dragY;
      card.text.x = dragX;
      card.text.y = dragY;
      
      // Highlight potential slot (visual feedback without tint)
      const slotIndex = this.findNearestSlot(dragX);
      if (slotIndex !== -1 && Math.abs(dragY - 400) < 100) {
        // Show visual hint - change fill color slightly
        card.sprite.setFillStyle(0xddbb66);
      } else {
        card.sprite.setFillStyle(0xaa8844);
      }
    });

    this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
      const card = gameObject.getData('card') as Card;
      card.sprite.setAlpha(1);
      card.sprite.setScale(1);
      card.text.setScale(1);
      card.sprite.setFillStyle(0xaa8844); // Reset to original color

      // Snap to nearest slot
      const slotIndex = this.findNearestSlot(card.sprite.x);
      if (slotIndex !== -1) {
        card.sprite.x = this.targetSlots[slotIndex];
        card.sprite.y = 400;
        card.text.x = this.targetSlots[slotIndex];
        card.text.y = 400;
      } else {
        // If not near a slot, return to original position or keep where dropped
        // For better UX, we'll keep it where dropped
      }

      this.checkCompletion();
    });

    this.input.setDraggable(this.cards.map(c => c.sprite));
  }

  private findNearestSlot(x: number): number {
    let nearestIndex = -1;
    let nearestDistance = Infinity;

    this.targetSlots.forEach((slotX, index) => {
      const distance = Math.abs(x - slotX);
      if (distance < nearestDistance && distance < 50) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  private checkCompletion(): void {
    let correctCount = 0;

    this.cards.forEach(card => {
      const slotIndex = this.findNearestSlot(card.sprite.x);
      if (slotIndex === card.targetPosition) {
        correctCount++;
        card.sprite.setFillStyle(0x00aa00);
      } else {
        card.sprite.setFillStyle(0xaa8844);
      }
    });

    const accuracy = Math.round((correctCount / this.totalCards) * 100);
    this.scoreText.setText(`Accuracy: ${accuracy}%`);

    if (accuracy >= 80) {
      this.missionComplete(true);
    }
  }

  private updateTimer(): void {
    this.timeRemaining--;
    this.timerText.setText(`Time: ${this.timeRemaining}`);

    if (this.timeRemaining <= 0) {
      this.missionComplete(false);
    }
  }

  private missionComplete(success: boolean): void {
    // Stop timer and disable input
    this.time.removeAllEvents();
    this.input.removeAllListeners();

    // Show results using utility
    showMissionResults(this, this.missionId, success, () => {
      this.scene.start('BasementScene');
    });
  }
}
