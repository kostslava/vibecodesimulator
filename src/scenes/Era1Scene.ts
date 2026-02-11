import Phaser from 'phaser';

export class Era1Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Era1Scene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Era 1: 1945-1950 ENIAC Era
    // CGA 4-color palette aesthetic
    this.cameras.main.setBackgroundColor('#000000');

    this.add.text(width / 2, height / 2, 'ERA 1: ENIAC ERA\n1945-1950', {
      fontSize: '48px',
      color: '#00ffff', // Cyan
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Placeholder - in full game, this would be interactive environment
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
