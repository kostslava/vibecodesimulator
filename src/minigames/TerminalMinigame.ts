import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { getMissionById } from '../data/missions';

export class TerminalMinigame extends Phaser.Scene {
  private commands: string[] = ['ls -la', 'cd /home', 'chmod +x script.sh', 'make install'];
  private currentCommandIndex: number = 0;
  private inputText: string = '';
  private displayText!: Phaser.GameObjects.Text;
  private missionId: string = '';
  private accuracy: number = 100;

  constructor() {
    super({ key: 'TerminalMinigame' });
  }

  init(data: { missionId: string }): void {
    this.missionId = data.missionId || '';
  }

  create(): void {
    const width = this.cameras.main.width;
    this.cameras.main.setBackgroundColor('#000000');

    this.add.text(width / 2, 50, 'TERMINAL COMMANDS', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, 100, 'Type the command exactly as shown', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Command to type
    this.add.text(100, 200, 'TYPE THIS:', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });

    this.add.text(100, 240, '> ' + this.commands[this.currentCommandIndex], {
      fontSize: '24px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });

    // User input display
    this.add.text(100, 320, 'YOUR INPUT:', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });

    this.displayText = this.add.text(100, 360, '> _', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });

    // Keyboard input
    this.input.keyboard?.on('keydown', this.handleKeyPress, this);
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.checkCommand();
    } else if (event.key === 'Backspace') {
      this.inputText = this.inputText.slice(0, -1);
      this.displayText.setText('> ' + this.inputText + '_');
    } else if (event.key.length === 1) {
      this.inputText += event.key;
      this.displayText.setText('> ' + this.inputText + '_');
    }
  }

  private checkCommand(): void {
    const expected = this.commands[this.currentCommandIndex];
    const isCorrect = this.inputText === expected;

    if (!isCorrect) {
      this.accuracy -= 10;
    }

    this.currentCommandIndex++;
    this.inputText = '';

    if (this.currentCommandIndex >= this.commands.length) {
      this.missionComplete(this.accuracy >= 70);
    } else {
      this.displayText.setText('> _');
      this.scene.restart();
    }
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
