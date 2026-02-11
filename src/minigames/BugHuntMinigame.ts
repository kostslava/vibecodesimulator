import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { getMissionById } from '../data/missions';

export class BugHuntMinigame extends Phaser.Scene {
  private bugLines: number[] = [2, 5, 7];
  private foundBugs: number[] = [];
  private codeLines: Phaser.GameObjects.Text[] = [];
  private missionId: string = '';

  constructor() {
    super({ key: 'BugHuntMinigame' });
  }

  init(data: { missionId: string }): void {
    this.missionId = data.missionId || '';
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#1a1a1a');

    this.add.text(width / 2, 50, 'BUG HUNT', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, 100, 'Click on lines with bugs', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    const code = [
      'function calculateTotal(items) {',
      '  let total = 0;',
      '  for (let i = 0; i <= items.length; i++) {', // Bug: should be i < items.length
      '    total += items[i].price;',
      '  }',
      '  return total',  // Bug: missing semicolon
      '}',
      'const result = calculatetotal([...]);',  // Bug: wrong function name (calculatetotal vs calculateTotal)
    ];

    const startY = 180;
    const lineHeight = 40;

    code.forEach((line, index) => {
      const lineText = this.add.text(100, startY + index * lineHeight, `${index + 1}. ${line}`, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'monospace',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      });

      lineText.setInteractive({ useHandCursor: true });
      lineText.on('pointerdown', () => this.selectLine(index));

      this.codeLines.push(lineText);
    });

    this.add.text(width / 2, height - 100, 'Press ENTER when done', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.input.keyboard?.on('keydown-ENTER', () => {
      this.checkSolution();
    });
  }

  private selectLine(lineIndex: number): void {
    if (this.foundBugs.includes(lineIndex)) {
      this.foundBugs = this.foundBugs.filter(i => i !== lineIndex);
      this.codeLines[lineIndex].setBackgroundColor('#000000');
    } else {
      this.foundBugs.push(lineIndex);
      this.codeLines[lineIndex].setBackgroundColor('#ff0000');
    }
  }

  private checkSolution(): void {
    const correctBugs = this.bugLines.filter(bug => this.foundBugs.includes(bug));
    const falsePositives = this.foundBugs.filter(found => !this.bugLines.includes(found));

    const success = correctBugs.length === this.bugLines.length && falsePositives.length < 3;
    this.missionComplete(success);
  }

  private missionComplete(success: boolean): void {
    this.input.keyboard?.removeAllListeners();

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);
    const resultText = success ? 'MISSION COMPLETE!' : 'MISSION FAILED!';
    const resultColor = success ? '#00ff00' : '#ff0000';

    this.add.text(width / 2, height / 2, resultText, {
      fontSize: '48px',
      color: resultColor,
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    if (success) {
      const mission = getMissionById(this.missionId);
      if (mission) {
        const state = useGameStore.getState();
        state.addMoney(mission.reward.money);
        state.completeMission(this.missionId);
        state.incrementStat('minigamesWon');
        state.incrementStat('projectsCompleted');
      }
    } else {
      useGameStore.getState().incrementStat('minigamesLost');
    }

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('BasementScene');
    });
  }
}
