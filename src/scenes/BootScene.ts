import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Display loading text
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const loadingText = this.add.text(width / 2, height / 2, 'LOADING...', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });
    loadingText.setOrigin(0.5);
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2 + 50, width / 2, 50);
    
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(width / 4 + 10, height / 2 + 60, (width / 2 - 20) * value, 30);
    });
    
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
    
    // Load any assets here
    // For MVP, we'll use simple shapes and text, so no actual assets needed
    
    // Placeholder: In production, load sprites, audio, fonts, etc.
    // this.load.image('key', 'path/to/image.png');
  }

  create(): void {
    // Assets loaded, proceed to main menu
    this.scene.start('MainMenuScene');
  }
}
