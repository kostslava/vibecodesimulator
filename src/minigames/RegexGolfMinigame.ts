import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { getMissionById } from '../data/missions';

export class RegexGolfMinigame extends Phaser.Scene {
  private missionId: string = '';

  constructor() {
    super({ key: 'RegexGolfMinigame' });
  }

  init(data: { missionId: string }): void {
    this.missionId = data.missionId || '';
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#1a1a1a');

    this.add.text(width / 2, 50, 'REGEX GOLF', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, 'Simplified for MVP - Auto Complete', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      this.missionComplete(true);
    });
  }

  private missionComplete(_success: boolean): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

    this.add.text(width / 2, height / 2, 'MISSION COMPLETE!', {
      fontSize: '48px',
      color: '#00ff00',
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
