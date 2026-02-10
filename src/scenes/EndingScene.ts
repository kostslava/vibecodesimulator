import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { checkEnding } from '../data/endings';

export class EndingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndingScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const state = useGameStore.getState();
    const ending = checkEnding({
      reputation: state.reputation,
      conspiracyCompletion: state.conspiracyCompletion,
      money: state.money,
      majorChoices: state.majorChoices,
    });

    this.cameras.main.setBackgroundColor('#000000');

    // Title
    this.add.text(width / 2, 100, ending?.title || 'THE END', {
      fontSize: '48px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Description
    this.add.text(width / 2, 170, ending?.description || 'Your journey is complete.', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'monospace',
      wordWrap: { width: width - 200 },
      align: 'center',
    }).setOrigin(0.5);

    // Epilogue
    const startY = 250;
    ending?.epilogue.forEach((line, index) => {
      this.add.text(width / 2, startY + index * 35, line, {
        fontSize: '16px',
        color: '#00ff00',
        fontFamily: 'monospace',
        wordWrap: { width: width - 200 },
        align: 'center',
      }).setOrigin(0.5);
    });

    // Stats
    const statsY = height - 200;
    this.add.text(width / 2, statsY, 'YOUR STATS:', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    const stats = [
      `Projects Completed: ${state.projectsCompleted}`,
      `Minigames Won: ${state.minigamesWon}`,
      `Minigames Lost: ${state.minigamesLost}`,
      `Final Money: $${state.money}`,
      `Conspiracy Discovered: ${state.conspiracyCompletion}%`,
    ];

    stats.forEach((stat, index) => {
      this.add.text(width / 2, statsY + 40 + index * 25, stat, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'monospace',
      }).setOrigin(0.5);
    });

    // Options
    this.add.text(width / 2, height - 50, 'Press SPACE to return to menu', {
      fontSize: '16px',
      color: '#888888',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.input.keyboard?.on('keydown-SPACE', () => {
      this.scene.start('MainMenuScene');
    });
  }
}
