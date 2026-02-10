import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { SaveLoadSystem } from '../systems/SaveLoadSystem';
import { getMissionsByEra } from '../data/missions';
import { getEquipmentByEra } from '../data/equipment';

export class BasementScene extends Phaser.Scene {
  private playerName: string = '';
  private currentEra: number = 1;
  private menuOptions: Phaser.GameObjects.Text[] = [];

  constructor() {
    super({ key: 'BasementScene' });
  }

  create(): void {
    const state = useGameStore.getState();
    this.playerName = state.playerName;
    this.currentEra = state.currentEra;

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(0, 0, width, height, 0x1a1a1a).setOrigin(0);

    // Title
    const eraName = this.getEraName(this.currentEra);
    this.add.text(width / 2, 50, `YOUR BASEMENT - ${eraName}`, {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Player info
    this.add.text(50, 100, `Programmer: ${this.playerName}`, {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });

    this.add.text(50, 130, `Money: $${state.money}`, {
      fontSize: '16px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });

    // Reputation display
    this.add.text(50, 160, 'Reputation:', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });

    const repY = 185;
    this.add.text(70, repY, `Hacker: ${state.reputation.hackerCred}`, {
      fontSize: '14px',
      color: '#00ffff',
      fontFamily: 'monospace',
    });
    this.add.text(70, repY + 25, `Corporate: ${state.reputation.corporateStanding}`, {
      fontSize: '14px',
      color: '#ff00ff',
      fontFamily: 'monospace',
    });
    this.add.text(70, repY + 50, `Government: ${state.reputation.governmentTrust}`, {
      fontSize: '14px',
      color: '#ff0000',
      fontFamily: 'monospace',
    });
    this.add.text(70, repY + 75, `Community: ${state.reputation.communityRespect}`, {
      fontSize: '14px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });

    // Basement visual representation
    this.createBasementVisual();

    // Menu
    this.createMenu();

    // Auto-save when entering basement
    SaveLoadSystem.autoSave();
  }

  private getEraName(era: number): string {
    const eraNames: Record<number, string> = {
      1: '1945-1950 ENIAC ERA',
      2: '1951-1960 MAINFRAME ERA',
      3: '1961-1970 COLD WAR COMPUTING',
      4: '1971-1980 MICROPROCESSOR DAWN',
      5: '1981-1990 PC REVOLUTION',
      6: '1991-2000 INTERNET EXPLOSION',
      7: '2001-2010 SURVEILLANCE EXPANSION',
      8: '2011-2015 MOBILE & BIG DATA',
      9: '2016-2020 AI BOOM',
      10: '2021-2026 TECHNOCRATIC ENDGAME',
    };
    return eraNames[era] || 'UNKNOWN ERA';
  }

  private createBasementVisual(): void {
    const centerX = this.cameras.main.width / 2 + 150;
    const centerY = 350;

    // Simple basement representation
    // Desk
    this.add.rectangle(centerX, centerY + 50, 200, 20, 0x8B4513);

    // Chair
    this.add.rectangle(centerX, centerY + 100, 60, 80, 0x654321);

    // Monitor/Computer
    const computerColor = this.currentEra >= 5 ? 0x444444 : 0x333333;
    this.add.rectangle(centerX, centerY, 80, 60, computerColor);
    this.add.rectangle(centerX, centerY - 5, 70, 50, 0x003300);

    // Label
    this.add.text(centerX, centerY + 150, 'Your Workspace', {
      fontSize: '14px',
      color: '#888888',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
  }

  private createMenu(): void {
    const menuX = 50;
    const menuY = 400;

    this.add.text(menuX, menuY - 30, 'BASEMENT MENU:', {
      fontSize: '18px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });

    const options = [
      { text: '[P]roject Board', action: () => this.openProjectBoard(), key: 'P' },
      { text: '[E]quipment Shop', action: () => this.openEquipmentShop(), key: 'E' },
      { text: '[I]nvestigation Board', action: () => this.openInvestigationBoard(), key: 'I' },
      { text: '[S]ave Game', action: () => this.saveGame(), key: 'S' },
      { text: '[N]ext Era', action: () => this.nextEra(), key: 'N' },
      { text: '[Q]uit to Menu', action: () => this.quitToMenu(), key: 'Q' },
    ];

    options.forEach((option, index) => {
      const optionText = this.add.text(menuX, menuY + index * 30, option.text, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'monospace',
      });
      optionText.setInteractive({ useHandCursor: true });

      optionText.on('pointerover', () => {
        optionText.setColor('#00ff00');
      });

      optionText.on('pointerout', () => {
        optionText.setColor('#ffffff');
      });

      optionText.on('pointerdown', () => {
        option.action();
      });

      // Keyboard shortcuts - only trigger if no modifiers are pressed
      this.input.keyboard?.on(`keydown-${option.key}`, (event: KeyboardEvent) => {
        if (!event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
          option.action();
        }
      });

      this.menuOptions.push(optionText);
    });
  }

  private openProjectBoard(): void {
    const missions = getMissionsByEra(this.currentEra);
    const state = useGameStore.getState();

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create overlay that doesn't block mission clicks
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0);
    overlay.setDepth(-1); // Put overlay behind other elements

    const boardContainer = this.add.container(0, 0);
    boardContainer.setDepth(1);

    const titleText = this.add.text(width / 2, 80, 'PROJECT BOARD', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
    boardContainer.add(titleText);

    const closeButton = this.add.text(width - 100, 50, '[X] CLOSE', {
      fontSize: '16px',
      color: '#ff0000',
      fontFamily: 'monospace',
    });
    closeButton.setInteractive({ useHandCursor: true });
    closeButton.on('pointerover', () => closeButton.setColor('#ff5555'));
    closeButton.on('pointerout', () => closeButton.setColor('#ff0000'));
    closeButton.on('pointerdown', () => {
      overlay.destroy();
      boardContainer.destroy();
      this.scene.restart();
    });
    boardContainer.add(closeButton);

    if (missions.length === 0) {
      const noMissionsText = this.add.text(width / 2, height / 2, 'No missions available in this era.', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'monospace',
      }).setOrigin(0.5);
      boardContainer.add(noMissionsText);
    } else {
      const startY = 150;
      missions.forEach((mission, index) => {
        const isCompleted = state.completedMissions.includes(mission.id);
        const status = isCompleted ? '[DONE]' : '[NEW]';
        const color = isCompleted ? '#666666' : '#00ff00';

        // Create a background for each mission for better click detection
        const missionBg = this.add.rectangle(width / 2, startY + index * 90, width - 200, 75, 0x222222, 0.5);
        boardContainer.add(missionBg);

        const missionText = this.add.text(100, startY + index * 90 - 30, 
          `${status} ${mission.title}\nClient: ${mission.client}\nReward: $${mission.reward.money}`, {
          fontSize: '16px',
          color: color,
          fontFamily: 'monospace',
        });
        boardContainer.add(missionText);

        if (!isCompleted) {
          missionBg.setInteractive({ useHandCursor: true });
          missionText.setInteractive({ useHandCursor: true });
          
          const addHoverEffect = (obj: Phaser.GameObjects.GameObject) => {
            obj.on('pointerover', () => {
              missionBg.setFillStyle(0x004400, 0.7);
              missionText.setColor('#ffff00');
            });
            obj.on('pointerout', () => {
              missionBg.setFillStyle(0x222222, 0.5);
              missionText.setColor(color);
            });
            obj.on('pointerdown', () => {
              overlay.destroy();
              boardContainer.destroy();
              this.startMission(mission.id);
            });
          };

          addHoverEffect(missionBg);
          addHoverEffect(missionText);
        }
      });
    }

    const instructionText = this.add.text(width / 2, height - 60, 'Click [X] CLOSE or a mission to continue', {
      fontSize: '14px',
      color: '#888888',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
    boardContainer.add(instructionText);
  }

  private startMission(missionId: string): void {
    // Store the mission ID and start the appropriate minigame
    const state = useGameStore.getState();
    state.recordChoice('current_mission', missionId);

    // Get mission to determine minigame type
    const missions = getMissionsByEra(this.currentEra);
    const mission = missions.find(m => m.id === missionId);

    if (mission) {
      const minigameScenes: Record<string, string> = {
        'punchcard': 'PunchCardMinigame',
        'wiring': 'WireRoutingMinigame',
        'terminal': 'TerminalMinigame',
        'bughunt': 'BugHuntMinigame',
        'merge': 'MergeConflictMinigame',
        'regex': 'RegexGolfMinigame',
      };

      const sceneKey = minigameScenes[mission.minigameType];
      if (sceneKey) {
        this.scene.start(sceneKey, { missionId: missionId, mission: mission });
      }
    }
  }

  private openEquipmentShop(): void {
    const equipment = getEquipmentByEra(this.currentEra);
    const state = useGameStore.getState();

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0).setInteractive();

    this.add.text(width / 2, 80, 'EQUIPMENT SHOP', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(100, 120, `Your Money: $${state.money}`, {
      fontSize: '18px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });

    const startY = 170;
    equipment.forEach((item, index) => {
      const owned = state.equipment.includes(item.id);
      const status = owned ? '[OWNED]' : `$${item.cost}`;
      const color = owned ? '#666666' : '#00ff00';

      const itemText = this.add.text(100, startY + index * 60,
        `${status} ${item.name}\n${item.description}`, {
        fontSize: '14px',
        color: color,
        fontFamily: 'monospace',
      });

      if (!owned && state.money >= item.cost) {
        itemText.setInteractive({ useHandCursor: true });
        itemText.on('pointerdown', () => {
          if (state.spendMoney(item.cost)) {
            state.addEquipment(item.id);
            overlay.destroy();
            this.scene.restart();
          }
        });
      }
    });

    overlay.on('pointerdown', () => {
      overlay.destroy();
      this.scene.restart();
    });
  }

  private openInvestigationBoard(): void {
    const state = useGameStore.getState();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.95).setOrigin(0).setInteractive();

    this.add.text(width / 2, 80, 'INVESTIGATION BOARD', {
      fontSize: '32px',
      color: '#ff0000',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, 140, `Conspiracy Completion: ${state.conspiracyCompletion}%`, {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, 200, `Documents Discovered: ${state.discoveredDocuments.length}`, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Simple visualization
    const startY = 270;
    state.discoveredDocuments.slice(0, 10).forEach((docId, index) => {
      this.add.text(100, startY + index * 25, `• ${docId}`, {
        fontSize: '14px',
        color: '#00ffff',
        fontFamily: 'monospace',
      });
    });

    overlay.on('pointerdown', () => {
      overlay.destroy();
      this.scene.restart();
    });
  }

  private saveGame(): void {
    if (SaveLoadSystem.saveGame(0)) {
      this.showMessage('Game saved successfully!');
    } else {
      this.showMessage('Failed to save game.');
    }
  }

  private nextEra(): void {
    const state = useGameStore.getState();
    if (this.currentEra < 10) {
      state.setCurrentEra(this.currentEra + 1);
      this.scene.restart();
    } else {
      // Trigger ending
      this.scene.start('EndingScene');
    }
  }

  private quitToMenu(): void {
    SaveLoadSystem.autoSave();
    this.scene.start('MainMenuScene');
  }

  private showMessage(message: string): void {
    const width = this.cameras.main.width;
    const messageText = this.add.text(width / 2, 50, message, {
      fontSize: '16px',
      color: '#00ff00',
      fontFamily: 'monospace',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 },
    });
    messageText.setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      messageText.destroy();
    });
  }
}
