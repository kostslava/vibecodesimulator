import Phaser from 'phaser';

export class Era6Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Era6Scene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#000000');

    this.add.text(width / 2, height / 2, 'ERA 6', {
      fontSize: '48px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, height - 100, 'Press SPACE to return to basement', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('BasementScene');
    });
  }
}
