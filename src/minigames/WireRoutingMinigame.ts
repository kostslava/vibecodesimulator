import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { getMissionById } from '../data/missions';

export class WireRoutingMinigame extends Phaser.Scene {
  private connections: Array<{ from: number; to: number }> = [];
  private requiredConnections: Array<{ from: number; to: number }> = [];
  private drawing: boolean = false;
  private currentLine: Phaser.GameObjects.Line | null = null;
  private startNode: number = -1;
  private missionId: string = '';
  private timerText!: Phaser.GameObjects.Text;
  private timeRemaining: number = 90;

  constructor() {
    super({ key: 'WireRoutingMinigame' });
  }

  init(data: { missionId: string }): void {
    this.missionId = data.missionId || '';
  }

  create(): void {
    const width = this.cameras.main.width;

    this.cameras.main.setBackgroundColor('#1a1a1a');

    this.add.text(width / 2, 50, 'WIRE ROUTING', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, 100, 'Connect matching numbered nodes', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.timerText = this.add.text(100, 150, 'Time: 90', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });

    // Create nodes
    this.createNodes();

    // Timer
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining--;
        this.timerText.setText(`Time: ${this.timeRemaining}`);
        if (this.timeRemaining <= 0) {
          this.missionComplete(false);
        }
      },
      loop: true,
    });
  }

  private createNodes(): void {
    const width = this.cameras.main.width;
    const leftX = 200;
    const rightX = width - 200;
    const startY = 200;
    const spacing = 80;
    const numNodes = 4;

    // Required connections (simple pattern)
    this.requiredConnections = [
      { from: 0, to: 0 },
      { from: 1, to: 1 },
      { from: 2, to: 2 },
      { from: 3, to: 3 },
    ];

    // Left nodes (inputs)
    for (let i = 0; i < numNodes; i++) {
      const y = startY + i * spacing;
      const circle = this.add.circle(leftX, y, 20, 0x00ff00);
      circle.setStrokeStyle(3, 0xffffff);
      circle.setInteractive({ useHandCursor: true });
      circle.setData('node', i);
      circle.setData('side', 'left');

      this.add.text(leftX - 50, y, `${i + 1}`, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'monospace',
      }).setOrigin(0.5);

      circle.on('pointerdown', () => {
        this.startConnection(i, leftX, y);
      });
    }

    // Right nodes (outputs)
    for (let i = 0; i < numNodes; i++) {
      const y = startY + i * spacing;
      const circle = this.add.circle(rightX, y, 20, 0xff0000);
      circle.setStrokeStyle(3, 0xffffff);
      circle.setInteractive({ useHandCursor: true });
      circle.setData('node', i);
      circle.setData('side', 'right');

      this.add.text(rightX + 50, y, `${i + 1}`, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'monospace',
      }).setOrigin(0.5);

      circle.on('pointerdown', () => {
        this.endConnection(i);
      });
    }
  }

  private startConnection(nodeId: number, x: number, y: number): void {
    this.startNode = nodeId;
    this.drawing = true;

    // Visual feedback
    this.currentLine = this.add.line(0, 0, x, y, x, y, 0xffff00, 1);
    this.currentLine.setOrigin(0);
    this.currentLine.setLineWidth(3);

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.drawing && this.currentLine) {
        this.currentLine.setTo(x, y, pointer.x, pointer.y);
      }
    });
  }

  private endConnection(nodeId: number): void {
    if (!this.drawing || this.startNode === -1) return;

    this.drawing = false;

    // Remove temp line
    if (this.currentLine) {
      this.currentLine.destroy();
      this.currentLine = null;
    }

    // Add connection
    this.connections.push({ from: this.startNode, to: nodeId });
    this.startNode = -1;

    // Draw permanent line
    const width = this.cameras.main.width;
    const leftX = 200;
    const rightX = width - 200;
    const startY = 200;
    const spacing = 80;

    const fromY = startY + this.connections[this.connections.length - 1].from * spacing;
    const toY = startY + nodeId * spacing;

    const line = this.add.line(0, 0, leftX, fromY, rightX, toY, 0x00ff00, 1);
    line.setOrigin(0);
    line.setLineWidth(2);

    this.checkCompletion();
  }

  private checkCompletion(): void {
    if (this.connections.length === this.requiredConnections.length) {
      let allCorrect = true;

      this.requiredConnections.forEach(req => {
        const match = this.connections.find(c => c.from === req.from && c.to === req.to);
        if (!match) {
          allCorrect = false;
        }
      });

      if (allCorrect) {
        this.missionComplete(true);
      }
    }
  }

  private missionComplete(success: boolean): void {
    this.time.removeAllEvents();
    this.input.removeAllListeners();

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

    const resultText = success ? 'MISSION COMPLETE!' : 'MISSION FAILED!';
    const resultColor = success ? '#00ff00' : '#ff0000';

    this.add.text(width / 2, height / 2 - 50, resultText, {
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

        mission.reward.reputation.forEach(rep => {
          state.updateReputation(rep.type as keyof typeof state.reputation, rep.amount);
        });

        if (mission.conspiracyReveal) {
          state.discoverDocument(mission.conspiracyReveal.documentId);
        }

        this.add.text(width / 2, height / 2 + 20, `+$${mission.reward.money}`, {
          fontSize: '32px',
          color: '#ffff00',
          fontFamily: 'monospace',
        }).setOrigin(0.5);
      }
    } else {
      useGameStore.getState().incrementStat('minigamesLost');
    }

    this.add.text(width / 2, height / 2 + 100, 'Press SPACE to continue', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('BasementScene');
    });
  }
}
