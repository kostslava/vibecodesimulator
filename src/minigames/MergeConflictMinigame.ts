import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { getMissionById } from '../data/missions';

export class MergeConflictMinigame extends Phaser.Scene {
  private missionId: string = '';
  private choices: string[] = [];

  constructor() {
    super({ key: 'MergeConflictMinigame' });
  }

  init(data: { missionId: string }): void {
    this.missionId = data.missionId || '';
  }

  create(): void {
    const width = this.cameras.main.width;
    this.cameras.main.setBackgroundColor('#1a1a1a');

    this.add.text(width / 2, 50, 'MERGE CONFLICT RESOLUTION', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, 100, 'Choose the correct version for each conflict', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Simplified merge conflict
    this.add.text(100, 180, 'CONFLICT 1:', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });

    const option1 = this.add.text(120, 220, 'A) const result = data.map(x => x * 2);', {
      fontSize: '16px',
      color: '#00ff00',
      fontFamily: 'monospace',
      backgroundColor: '#003300',
      padding: { x: 10, y: 5 },
    });

    const option2 = this.add.text(120, 260, 'B) const result = data.map(item => item * 2);', {
      fontSize: '16px',
      color: '#ff0000',
      fontFamily: 'monospace',
      backgroundColor: '#330000',
      padding: { x: 10, y: 5 },
    });

    option1.setInteractive({ useHandCursor: true });
    option2.setInteractive({ useHandCursor: true });

    option1.on('pointerdown', () => {
      this.choices.push('A');
      this.complete();
    });

    option2.on('pointerdown', () => {
      this.choices.push('B');
      this.complete();
    });
  }

  private complete(): void {
    // For MVP, we accept any choice
    this.missionComplete(true);
  }

  private missionComplete(_success: boolean): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);
    const resultText = 'MISSION COMPLETE!';
    const resultColor = '#00ff00';

    this.add.text(width / 2, height / 2, resultText, {
      fontSize: '48px',
      color: resultColor,
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    const mission = getMissionById(this.missionId);
    if (mission) {
      const state = useGameStore.getState();
      state.addMoney(mission.reward.money);
      state.completeMission(this.missionId);
      state.incrementStat('minigamesWon');
      state.incrementStat('projectsCompleted');
    }

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('BasementScene');
    });
  }
}
