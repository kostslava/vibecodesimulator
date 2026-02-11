import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { SaveLoadSystem } from '../systems/SaveLoadSystem';
import { NotificationSystem } from '../systems/NotificationSystem';
import { TutorialSystem } from '../systems/TutorialSystem';
import { getMissionsByEra } from '../data/missions';
import { getEquipmentByEra } from '../data/equipment';
import { WorkspaceVisualizer } from '../utils/WorkspaceVisualizer';
import { AnimationEffects } from '../utils/AnimationEffects';

export class BasementScene extends Phaser.Scene {
  private playerName: string = '';
  private currentEra: number = 1;
  private menuOptions: Phaser.GameObjects.Text[] = [];
  private workspaceVisualizer: WorkspaceVisualizer | null = null;
  private notificationSystem: NotificationSystem | null = null;
  private tutorialSystem: TutorialSystem | null = null;

  constructor() {
    super({ key: 'BasementScene' });
  }

  create(): void {
    const state = useGameStore.getState();
    this.playerName = state.playerName;
    this.currentEra = state.currentEra;

    // Initialize systems
    this.notificationSystem = new NotificationSystem(this);
    this.tutorialSystem = new TutorialSystem(this);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background - evolves with era
    const bgColor = this.getBackgroundColor(this.currentEra);
    this.add.rectangle(0, 0, width, height, bgColor).setOrigin(0);

    // Add subtle CRT effect for early eras
    if (this.currentEra <= 5) {
      AnimationEffects.createScanLines(this, 0.05);
    }

    // Title with glitch effect for later eras
    const eraName = this.getEraName(this.currentEra);
    const titleText = this.add.text(width / 2, 50, `YOUR WORKSPACE - ${eraName}`, {
      fontSize: '32px',
      color: this.getTitleColor(this.currentEra),
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    if (this.currentEra >= 8) {
      AnimationEffects.glitchText(this, titleText, 1000);
    }

    // Player info with animations
    const infoX = 50;
    const infoY = 100;
    
    const nameText = this.add.text(infoX, infoY, `Programmer: ${this.playerName}`, {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });
    AnimationEffects.fadeIn(this, nameText, 500);

    const moneyText = this.add.text(infoX, infoY + 30, `Money: $${state.money}`, {
      fontSize: '16px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });
    AnimationEffects.fadeIn(this, moneyText, 700);

    // Reputation display with visual bars
    this.add.text(infoX, infoY + 60, 'Reputation:', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });

    const repY = infoY + 85;
    this.createReputationBar(infoX + 10, repY, 'Hacker', state.reputation.hackerCred, '#00ffff');
    this.createReputationBar(infoX + 10, repY + 25, 'Corporate', state.reputation.corporateStanding, '#ff00ff');
    this.createReputationBar(infoX + 10, repY + 50, 'Government', state.reputation.governmentTrust, '#ff0000');
    this.createReputationBar(infoX + 10, repY + 75, 'Community', state.reputation.communityRespect, '#00ff00');

    // Evolved workspace visualization
    this.workspaceVisualizer = new WorkspaceVisualizer(this, width / 2 + 150, 350);
    this.workspaceVisualizer.create({
      era: this.currentEra,
      equipment: state.equipment,
    });

    // Menu
    this.createMenu();

    // Auto-save when entering basement
    SaveLoadSystem.autoSave();

    // Show welcome notification on first visit
    if (state.currentEra === 1 && state.completedMissions.length === 0) {
      this.time.delayedCall(500, () => {
        this.notificationSystem?.show({
          title: 'Welcome to Your Basement',
          message: 'This is where you\'ll build your programming empire. Start by selecting a project from the Project Board!',
          type: 'info',
          duration: 4000,
        });
      });

      // Show tutorial
      this.time.delayedCall(5000, () => {
        this.showTutorial();
      });
    }
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

  private getBackgroundColor(era: number): number {
    // Background evolves from dark to more modern
    const colors: Record<number, number> = {
      1: 0x0a0a0a, // Very dark (bare basement)
      2: 0x1a1a1a,
      3: 0x1a1a1a,
      4: 0x222222,
      5: 0x252525,
      6: 0x1a1a2a, // Slight blue tint
      7: 0x1a1a2a,
      8: 0x0a0a15, // Darker blue
      9: 0x0a0015, // Purple tint
      10: 0x000010, // Deep blue/black
    };
    return colors[era] || 0x1a1a1a;
  }

  private getTitleColor(era: number): string {
    // Title color evolves with technology
    const colors: Record<number, string> = {
      1: '#00aa00', // Dim green
      2: '#00ff00', // Bright green
      3: '#00ff00',
      4: '#00ff00',
      5: '#00ff00',
      6: '#00ffff', // Cyan (internet era)
      7: '#00aaff', // Blue
      8: '#0088ff',
      9: '#ff00ff', // Magenta (AI)
      10: '#00ffff', // Cyan (futuristic)
    };
    return colors[era] || '#00ff00';
  }

  private createReputationBar(x: number, y: number, label: string, value: number, color: string): void {
    // Label
    this.add.text(x, y, `${label}:`, {
      fontSize: '14px',
      color: color,
      fontFamily: 'monospace',
    });

    // Value
    this.add.text(x + 120, y, value.toString(), {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });

    // Progress bar
    const barWidth = 100;
    const barHeight = 8;
    const barBg = this.add.rectangle(x + 160, y + 6, barWidth, barHeight, 0x333333);
    barBg.setOrigin(0, 0.5);
    
    const fillWidth = Math.min((value / 100) * barWidth, barWidth);
    const barFill = this.add.rectangle(x + 160, y + 6, fillWidth, barHeight, parseInt(color.replace('#', '0x')));
    barFill.setOrigin(0, 0.5);

    // Animate fill
    barFill.setScale(0, 1);
    this.tweens.add({
      targets: barFill,
      scaleX: 1,
      duration: 800,
      ease: 'Power2',
      delay: 300,
    });
  }

  private showTutorial(): void {
    const steps = [
      {
        title: 'Welcome to Vibe Code Simulator!',
        message: 'You are a programmer starting in 1945. Your goal is to build your career, upgrade your workspace, and uncover the truth about technology\'s evolution.',
        position: 'center' as const,
      },
      {
        title: 'Project Board',
        message: 'Press [P] or click "Project Board" to see available missions. Complete missions to earn money and reputation.',
        position: 'bottom' as const,
      },
      {
        title: 'Equipment Shop',
        message: 'Press [E] to buy equipment upgrades. Better equipment makes minigames easier and your workspace more impressive!',
        position: 'bottom' as const,
      },
      {
        title: 'Investigation Board',
        message: 'Press [I] to view conspiracy documents you\'ve discovered. Connect the dots to unlock special endings.',
        position: 'bottom' as const,
      },
      {
        title: 'Era Progression',
        message: 'Press [N] to advance to the next era once you\'ve completed enough missions. Your workspace will evolve with technology!',
        position: 'bottom' as const,
      },
      {
        title: 'Good Luck!',
        message: 'The journey through 80 years of computing history begins now. Every choice matters!',
        position: 'center' as const,
      },
    ];

    this.tutorialSystem?.start(steps, () => {
      this.notificationSystem?.show({
        title: 'Tutorial Complete',
        message: 'You\'re ready to begin your journey!',
        type: 'success',
        duration: 2000,
      });
    });
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
