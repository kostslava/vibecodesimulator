import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { SaveLoadSystem } from '../systems/SaveLoadSystem';

export class MainMenuScene extends Phaser.Scene {
  private titleText!: Phaser.GameObjects.Text;
  private subtitleText!: Phaser.GameObjects.Text;
  private menuOptions: Phaser.GameObjects.Text[] = [];
  private selectedIndex: number = 0;
  private terminalLines: Phaser.GameObjects.Text[] = [];
  private terminalY: number = 0;

  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Add scrolling terminal background effect
    this.createTerminalBackground();

    // Title
    this.titleText = this.add.text(width / 2, 150, 'VIBE CODE SIMULATOR', {
      fontSize: '48px',
      color: '#00ff00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    });
    this.titleText.setOrigin(0.5);

    // Subtitle
    this.subtitleText = this.add.text(width / 2, 220, '80 Years of Programming History', {
      fontSize: '20px',
      color: '#00aa00',
      fontFamily: 'monospace',
    });
    this.subtitleText.setOrigin(0.5);

    // Menu options
    const options = [
      { text: 'NEW GAME', action: () => this.startNewGame() },
      { text: 'CONTINUE', action: () => this.continueGame() },
      { text: 'LOAD GAME', action: () => this.showLoadMenu() },
      { text: 'CREDITS', action: () => this.showCredits() },
    ];

    const startY = 350;
    const spacing = 60;

    options.forEach((option, index) => {
      const optionText = this.add.text(width / 2, startY + index * spacing, option.text, {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'monospace',
      });
      optionText.setOrigin(0.5);
      optionText.setInteractive({ useHandCursor: true });

      optionText.on('pointerover', () => {
        this.selectedIndex = index;
        this.updateSelection();
      });

      optionText.on('pointerdown', () => {
        option.action();
      });

      this.menuOptions.push(optionText);
    });

    // Keyboard controls
    this.input.keyboard?.on('keydown-UP', () => {
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
      this.updateSelection();
    });

    this.input.keyboard?.on('keydown-DOWN', () => {
      this.selectedIndex = Math.min(this.menuOptions.length - 1, this.selectedIndex + 1);
      this.updateSelection();
    });

    this.input.keyboard?.on('keydown-ENTER', () => {
      if (this.selectedIndex === 0) this.startNewGame();
      else if (this.selectedIndex === 1) this.continueGame();
      else if (this.selectedIndex === 2) this.showLoadMenu();
      else if (this.selectedIndex === 3) this.showCredits();
    });

    this.updateSelection();

    // Version info
    this.add.text(10, height - 30, 'v1.0.0', {
      fontSize: '12px',
      color: '#666666',
      fontFamily: 'monospace',
    });
  }

  private createTerminalBackground(): void {
    const terminalCommands = [
      '> INITIALIZING ENIAC...',
      '> LOADING VACUUM TUBES...',
      '> CONNECTING PUNCH CARD READER...',
      '> BOOT SEQUENCE COMPLETE',
      '> SYSTEM READY',
      '',
      '> CD /HISTORY/COMPUTING',
      '> LS -LA',
      'drwxr-xr-x  10 root  wheel   320 Jan  1 1945 1945-1950',
      'drwxr-xr-x  10 root  wheel   320 Jan  1 1951 1951-1960',
      'drwxr-xr-x  10 root  wheel   320 Jan  1 1961 1961-1970',
      '',
      '> AWAITING INPUT...',
    ];

    this.terminalY = 50;
    terminalCommands.forEach((cmd) => {
      const line = this.add.text(20, this.terminalY, cmd, {
        fontSize: '10px',
        color: '#003300',
        fontFamily: 'monospace',
      });
      line.setAlpha(0.3);
      this.terminalLines.push(line);
      this.terminalY += 15;
    });
  }

  private updateSelection(): void {
    this.menuOptions.forEach((option, index) => {
      if (index === this.selectedIndex) {
        option.setColor('#00ff00');
        option.setText('> ' + option.text.replace('> ', ''));
      } else {
        option.setColor('#ffffff');
        option.setText(option.text.replace('> ', ''));
      }
    });
  }

  private startNewGame(): void {
    // Show name input
    this.showNameInput();
  }

  private showNameInput(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Darken screen
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.9);
    overlay.setOrigin(0);

    const promptText = this.add.text(width / 2, height / 2 - 50, 'ENTER YOUR NAME:', {
      fontSize: '24px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });
    promptText.setOrigin(0.5);

    let playerName = '';
    const nameDisplay = this.add.text(width / 2, height / 2, '_ ', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });
    nameDisplay.setOrigin(0.5);

    const instructionText = this.add.text(width / 2, height / 2 + 100, 'Press ENTER to confirm', {
      fontSize: '16px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    instructionText.setOrigin(0.5);

    const keyboard = this.input.keyboard;
    if (!keyboard) return;

    const keyHandler = (event: KeyboardEvent) => {
      // Ignore keyboard shortcuts with modifier keys to prevent intercepting browser shortcuts
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      // Prevent default to avoid double input
      event.preventDefault();

      if (event.key === 'Enter' && playerName.length > 0) {
        keyboard.off('keydown', keyHandler);
        useGameStore.getState().setPlayerName(playerName);
        useGameStore.getState().setCurrentEra(1);
        overlay.destroy();
        promptText.destroy();
        nameDisplay.destroy();
        instructionText.destroy();
        this.scene.start('BasementScene');
      } else if (event.key === 'Backspace') {
        playerName = playerName.slice(0, -1);
        nameDisplay.setText(playerName + '_');
      } else if (event.key.length === 1 && playerName.length < 20 && /^[a-zA-Z0-9 _-]$/.test(event.key)) {
        // Only accept alphanumeric characters, spaces, underscores, and hyphens
        playerName += event.key;
        nameDisplay.setText(playerName + '_');
      }
    };

    keyboard.on('keydown', keyHandler);
  }

  private continueGame(): void {
    if (SaveLoadSystem.loadAutoSave()) {
      this.scene.start('BasementScene');
    } else {
      this.showMessage('No auto-save found. Start a new game.');
    }
  }

  private showLoadMenu(): void {
    this.showMessage('Load menu coming soon. Use CONTINUE for auto-save.');
  }

  private showCredits(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.95);
    overlay.setOrigin(0);
    overlay.setInteractive();

    const credits = [
      'VIBE CODE SIMULATOR',
      '',
      'A game about programming history,',
      'conspiracy, and choosing your path',
      'through 80 years of technological evolution.',
      '',
      'Built with:',
      'Phaser 3, TypeScript, Vite, Zustand',
      '',
      'Press any key to return',
    ];

    credits.forEach((line, index) => {
      this.add.text(width / 2, 150 + index * 35, line, {
        fontSize: '20px',
        color: '#00ff00',
        fontFamily: 'monospace',
      }).setOrigin(0.5);
    });

    this.input.keyboard?.once('keydown', () => {
      overlay.destroy();
      this.scene.restart();
    });

    overlay.on('pointerdown', () => {
      overlay.destroy();
      this.scene.restart();
    });
  }

  private showMessage(message: string): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const messageText = this.add.text(width / 2, height - 100, message, {
      fontSize: '16px',
      color: '#ff0000',
      fontFamily: 'monospace',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 },
    });
    messageText.setOrigin(0.5);

    this.time.delayedCall(3000, () => {
      messageText.destroy();
    });
  }
}
