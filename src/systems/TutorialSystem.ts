import Phaser from 'phaser';

export interface TutorialStep {
  title: string;
  message: string;
  highlight?: { x: number; y: number; width: number; height: number };
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  skipable?: boolean;
}

/**
 * TutorialSystem - Interactive tutorial with highlights and step-by-step guidance
 */
export class TutorialSystem {
  private scene: Phaser.Scene;
  private currentStep: number = 0;
  private steps: TutorialStep[] = [];
  private container: Phaser.GameObjects.Container | null = null;
  private overlay: Phaser.GameObjects.Rectangle | null = null;
  private onComplete: (() => void) | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Start tutorial with given steps
   */
  public start(steps: TutorialStep[], onComplete?: () => void): void {
    this.steps = steps;
    this.currentStep = 0;
    this.onComplete = onComplete || null;
    this.showStep(0);
  }

  private showStep(stepIndex: number): void {
    if (stepIndex >= this.steps.length) {
      this.complete();
      return;
    }

    const step = this.steps[stepIndex];
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;

    // Clear previous
    this.clear();

    // Create dark overlay
    this.overlay = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.8);
    this.overlay.setOrigin(0);
    this.overlay.setDepth(9000);
    this.overlay.setInteractive();

    // Create highlight if specified
    if (step.highlight) {
      const highlightGraphics = this.scene.add.graphics();
      highlightGraphics.setDepth(9001);
      
      // Cut out highlighted area
      highlightGraphics.fillStyle(0x000000, 0);
      highlightGraphics.fillRect(
        step.highlight.x,
        step.highlight.y,
        step.highlight.width,
        step.highlight.height
      );
      
      // Add glowing border around highlight
      highlightGraphics.lineStyle(3, 0x00ff00, 1);
      highlightGraphics.strokeRect(
        step.highlight.x - 5,
        step.highlight.y - 5,
        step.highlight.width + 10,
        step.highlight.height + 10
      );
    }

    // Create tutorial box
    const boxWidth = 600;
    const boxHeight = 200;
    let boxX = width / 2;
    let boxY = height / 2;

    // Position based on preference
    if (step.position === 'top') boxY = 150;
    else if (step.position === 'bottom') boxY = height - 150;
    else if (step.position === 'left') boxX = boxWidth / 2 + 50;
    else if (step.position === 'right') boxX = width - boxWidth / 2 - 50;

    this.container = this.scene.add.container(boxX, boxY);
    this.container.setDepth(9500);

    // Background
    const bg = this.scene.add.rectangle(0, 0, boxWidth, boxHeight, 0x111111, 1);
    bg.setStrokeStyle(4, 0x00ff00);
    this.container.add(bg);

    // Step counter
    const stepCounter = this.scene.add.text(-boxWidth / 2 + 20, -boxHeight / 2 + 15, 
      `TUTORIAL ${stepIndex + 1}/${this.steps.length}`, {
      fontSize: '14px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });
    this.container.add(stepCounter);

    // Title
    const title = this.scene.add.text(0, -boxHeight / 2 + 45, step.title, {
      fontSize: '24px',
      color: '#00ff00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5, 0);
    this.container.add(title);

    // Message with typewriter effect
    const messageText = this.scene.add.text(0, -boxHeight / 2 + 85, '', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
      wordWrap: { width: boxWidth - 60 },
      align: 'center',
    });
    messageText.setOrigin(0.5, 0);
    this.container.add(messageText);

    // Typewriter effect
    this.typewriterEffect(messageText, step.message);

    // Continue button
    const continueText = stepIndex < this.steps.length - 1 ? 'NEXT →' : 'FINISH';
    const continueBtn = this.scene.add.text(0, boxHeight / 2 - 30, `[SPACE] ${continueText}`, {
      fontSize: '18px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });
    continueBtn.setOrigin(0.5);
    this.container.add(continueBtn);

    // Skip button (if allowed)
    if (step.skipable !== false) {
      const skipBtn = this.scene.add.text(boxWidth / 2 - 100, boxHeight / 2 - 30, '[ESC] SKIP', {
        fontSize: '14px',
        color: '#888888',
        fontFamily: 'monospace',
      });
      this.container.add(skipBtn);
    }

    // Keyboard controls
    const spaceKey = this.scene.input.keyboard?.addKey('SPACE');
    spaceKey?.once('down', () => {
      this.currentStep++;
      this.showStep(this.currentStep);
    });

    const escKey = this.scene.input.keyboard?.addKey('ESC');
    escKey?.once('down', () => {
      if (step.skipable !== false) {
        this.complete();
      }
    });

    // Entrance animation
    this.container.setAlpha(0);
    this.container.setScale(0.8);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      scale: 1,
      duration: 300,
      ease: 'Back.easeOut',
    });
  }

  private typewriterEffect(textObject: Phaser.GameObjects.Text, fullText: string): void {
    let currentText = '';
    let index = 0;
    const speed = 20;

    const timer = this.scene.time.addEvent({
      delay: speed,
      callback: () => {
        if (index < fullText.length) {
          currentText += fullText[index];
          textObject.setText(currentText);
          index++;
        } else {
          timer.destroy();
        }
      },
      loop: true,
    });
  }

  private clear(): void {
    if (this.container) {
      this.container.destroy();
      this.container = null;
    }
    if (this.overlay) {
      this.overlay.destroy();
      this.overlay = null;
    }
  }

  private complete(): void {
    this.clear();
    if (this.onComplete) {
      this.onComplete();
    }
  }

  /**
   * Skip tutorial immediately
   */
  public skip(): void {
    this.complete();
  }
}
