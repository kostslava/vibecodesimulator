import Phaser from 'phaser';

export interface WorkspaceConfig {
  era: number;
  equipment: string[];
}

/**
 * WorkspaceVisualizer - Creates era-appropriate workspace visuals
 * Evolves from 1945 bare basement to 2026 futuristic setup
 */
export class WorkspaceVisualizer {
  private scene: Phaser.Scene;
  private centerX: number;
  private centerY: number;
  private elements: Phaser.GameObjects.GameObject[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.centerX = x;
    this.centerY = y;
  }

  /**
   * Create workspace based on era and equipment
   */
  public create(config: WorkspaceConfig): void {
    // Clear existing elements
    this.clear();

    // Create era-specific workspace
    switch (config.era) {
      case 1: // 1945-1950: ENIAC Era
        this.createEra1Workspace(config);
        break;
      case 2: // 1951-1960: Mainframe Era
        this.createEra2Workspace(config);
        break;
      case 3: // 1961-1970: Cold War
        this.createEra3Workspace(config);
        break;
      case 4: // 1971-1980: Microprocessor
        this.createEra4Workspace(config);
        break;
      case 5: // 1981-1990: PC Revolution
        this.createEra5Workspace(config);
        break;
      case 6: // 1991-2000: Internet
        this.createEra6Workspace(config);
        break;
      case 7: // 2001-2010: Surveillance
        this.createEra7Workspace(config);
        break;
      case 8: // 2011-2015: Mobile
        this.createEra8Workspace(config);
        break;
      case 9: // 2016-2020: AI
        this.createEra9Workspace(config);
        break;
      case 10: // 2021-2026: Technocratic
        this.createEra10Workspace(config);
        break;
    }
  }

  private createEra1Workspace(config: WorkspaceConfig): void {
    // 1945-1950: Bare minimum - concrete walls, single bulb, wooden table
    
    // Bare concrete wall texture
    const wall = this.scene.add.rectangle(this.centerX, this.centerY - 100, 400, 250, 0x555555);
    wall.setAlpha(0.3);
    this.elements.push(wall);

    // Single hanging bulb with flicker animation
    const bulbCord = this.scene.add.rectangle(this.centerX - 50, this.centerY - 200, 2, 80, 0x333333);
    this.elements.push(bulbCord);
    
    const bulb = this.scene.add.circle(this.centerX - 50, this.centerY - 160, 12, 0xffff99);
    bulb.setAlpha(0.8);
    this.elements.push(bulb);

    // Light glow effect with pulsing animation
    const glow = this.scene.add.circle(this.centerX - 50, this.centerY - 160, 60, 0xffff99, 0.1);
    this.elements.push(glow);

    // Flickering light animation
    this.scene.tweens.add({
      targets: [bulb, glow],
      alpha: '-=0.1',
      duration: 100,
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 2000,
    });

    // Wooden table (rough)
    const tableTop = this.scene.add.rectangle(this.centerX, this.centerY + 50, 250, 25, 0x8B4513);
    this.elements.push(tableTop);
    
    const tableLeg1 = this.scene.add.rectangle(this.centerX - 100, this.centerY + 100, 15, 80, 0x654321);
    const tableLeg2 = this.scene.add.rectangle(this.centerX + 100, this.centerY + 100, 15, 80, 0x654321);
    this.elements.push(tableLeg1, tableLeg2);

    // Folding metal chair
    const chairSeat = this.scene.add.rectangle(this.centerX + 20, this.centerY + 110, 50, 10, 0x666666);
    const chairBack = this.scene.add.rectangle(this.centerX + 20, this.centerY + 80, 8, 60, 0x666666);
    this.elements.push(chairSeat, chairBack);

    // Punch card terminal (if available)
    if (config.equipment.some(e => e.includes('terminal'))) {
      const terminal = this.scene.add.rectangle(this.centerX - 30, this.centerY + 20, 100, 70, 0x333333);
      const screen = this.scene.add.rectangle(this.centerX - 30, this.centerY + 10, 80, 40, 0x003300);
      screen.setAlpha(0.6);
      this.elements.push(terminal, screen);
      
      // Add blinking cursor on screen
      const cursor = this.scene.add.rectangle(this.centerX - 50, this.centerY + 10, 3, 8, 0x00ff00);
      this.elements.push(cursor);
      this.scene.tweens.add({
        targets: cursor,
        alpha: 0,
        duration: 500,
        yoyo: true,
        repeat: -1,
      });
    }

    // Scattered punch cards with entrance animation
    for (let i = 0; i < 3; i++) {
      const card = this.scene.add.rectangle(
        this.centerX + 50 + i * 15,
        this.centerY + 45,
        30, 8, 0xeeeecc
      );
      card.setRotation((Math.random() - 0.5) * 0.3);
      card.setAlpha(0);
      this.elements.push(card);
      
      this.scene.tweens.add({
        targets: card,
        alpha: 1,
        duration: 300,
        delay: i * 100,
      });
    }

    // Label
    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 1: ENIAC - Bare Basement', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra2Workspace(_config: WorkspaceConfig): void {
    // 1951-1960: Slight improvements - painted wall, better desk
    
    // Painted wall (light gray)
    const wall = this.scene.add.rectangle(this.centerX, this.centerY - 100, 400, 250, 0x888888);
    wall.setAlpha(0.4);
    this.elements.push(wall);

    // Better lighting
    const bulb = this.scene.add.circle(this.centerX - 50, this.centerY - 160, 15, 0xffffcc);
    const glow = this.scene.add.circle(this.centerX - 50, this.centerY - 160, 80, 0xffffcc, 0.15);
    this.elements.push(bulb, glow);

    // Metal desk (industrial)
    const desk = this.scene.add.rectangle(this.centerX, this.centerY + 50, 280, 30, 0x777777);
    const drawer = this.scene.add.rectangle(this.centerX + 90, this.centerY + 40, 40, 15, 0x666666);
    this.elements.push(desk, drawer);

    // Office chair
    const chair = this.scene.add.rectangle(this.centerX + 30, this.centerY + 110, 60, 80, 0x555555);
    this.elements.push(chair);

    // Mainframe terminal
    const terminal = this.scene.add.rectangle(this.centerX - 40, this.centerY + 15, 120, 80, 0x444444);
    const screen = this.scene.add.rectangle(this.centerX - 40, this.centerY, 100, 50, 0x004400);
    screen.setAlpha(0.8);
    
    // Terminal text
    const termText = this.scene.add.text(this.centerX - 80, this.centerY - 15, '> READY_', {
      fontSize: '10px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });
    this.elements.push(terminal, screen, termText);

    // Paper printout
    const paper = this.scene.add.rectangle(this.centerX + 80, this.centerY + 40, 40, 60, 0xffffff);
    this.elements.push(paper);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 2: Mainframe - Basic Setup', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra3Workspace(_config: WorkspaceConfig): void {
    // 1961-1970: Cold War - classified documents, better equipment
    this.createBasicWorkspace();

    // Classified documents
    const docStack = this.scene.add.rectangle(this.centerX + 100, this.centerY + 40, 50, 30, 0xffdddd);
    const stamp = this.scene.add.text(this.centerX + 85, this.centerY + 30, 'TOP\nSECRET', {
      fontSize: '8px',
      color: '#ff0000',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    });
    this.elements.push(docStack, stamp);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 3: Cold War Computing', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra4Workspace(_config: WorkspaceConfig): void {
    // 1971-1980: Microprocessor - first PC, posters
    this.createBasicWorkspace();

    // PC (beige box)
    const pc = this.scene.add.rectangle(this.centerX - 60, this.centerY + 15, 100, 90, 0xddddc0);
    const pcScreen = this.scene.add.rectangle(this.centerX - 60, this.centerY - 5, 80, 50, 0x003300);
    this.elements.push(pc, pcScreen);

    // Poster on wall
    const poster = this.scene.add.rectangle(this.centerX - 130, this.centerY - 80, 60, 80, 0x4488ff);
    const posterText = this.scene.add.text(this.centerX - 150, this.centerY - 100, 'COMPUTING\nFUTURE', {
      fontSize: '10px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });
    this.elements.push(poster, posterText);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 4: Microprocessor Dawn', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra5Workspace(_config: WorkspaceConfig): void {
    // 1981-1990: PC Revolution - CRT, better setup, RGB lighting hints
    this.createBasicWorkspace();

    // CRT Monitor
    const monitor = this.scene.add.rectangle(this.centerX - 50, this.centerY + 10, 100, 100, 0xcccccc);
    const screen = this.scene.add.rectangle(this.centerX - 50, this.centerY + 5, 80, 70, 0x000000);
    const screenGlow = this.scene.add.rectangle(this.centerX - 50, this.centerY + 5, 80, 70, 0x00ff00, 0.3);
    this.elements.push(monitor, screen, screenGlow);

    // Keyboard
    const keyboard = this.scene.add.rectangle(this.centerX - 50, this.centerY + 65, 110, 25, 0xeeeeee);
    this.elements.push(keyboard);

    // Mouse
    const mouse = this.scene.add.circle(this.centerX + 30, this.centerY + 65, 8, 0xdddddd);
    this.elements.push(mouse);

    // Floppy disks
    for (let i = 0; i < 4; i++) {
      const floppy = this.scene.add.rectangle(this.centerX + 90 + i * 12, this.centerY + 40, 10, 12, 0x333333);
      this.elements.push(floppy);
    }

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 5: PC Revolution', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra6Workspace(_config: WorkspaceConfig): void {
    // 1991-2000: Internet - Multiple monitors, cables everywhere
    this.createModernWorkspace();

    // Cable management (messy) - using graphics lines instead
    const cableGraphics = this.scene.add.graphics();
    cableGraphics.lineStyle(2, 0x333333);
    
    for (let i = 0; i < 5; i++) {
      const startX = this.centerX - 100 + i * 20;
      const startY = this.centerY + 50;
      const midX = this.centerX - 80 + i * 20;
      const midY = this.centerY + 80;
      const endX = this.centerX - 60 + i * 20;
      const endY = this.centerY + 100;
      
      cableGraphics.beginPath();
      cableGraphics.moveTo(startX, startY);
      cableGraphics.lineTo(midX, midY);
      cableGraphics.lineTo(endX, endY);
      cableGraphics.strokePath();
    }
    
    this.elements.push(cableGraphics);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 6: Internet Explosion', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra7Workspace(_config: WorkspaceConfig): void {
    // 2001-2010: Surveillance - Dual monitors, webcam, secure setup
    this.createModernWorkspace();

    // Webcam
    const webcam = this.scene.add.circle(this.centerX - 50, this.centerY - 50, 6, 0x000000);
    const webcamLens = this.scene.add.circle(this.centerX - 50, this.centerY - 50, 3, 0x4444ff);
    this.elements.push(webcam, webcamLens);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 7: Surveillance Expansion', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra8Workspace(_config: WorkspaceConfig): void {
    // 2011-2015: Mobile - Tablet, smartphone, cloud
    this.createModernWorkspace();

    // Smartphone
    const phone = this.scene.add.rectangle(this.centerX + 100, this.centerY + 50, 20, 35, 0x000000);
    const phoneScreen = this.scene.add.rectangle(this.centerX + 100, this.centerY + 50, 18, 32, 0x00aaff);
    this.elements.push(phone, phoneScreen);

    // Tablet
    const tablet = this.scene.add.rectangle(this.centerX + 60, this.centerY + 60, 50, 35, 0x333333);
    const tabletScreen = this.scene.add.rectangle(this.centerX + 60, this.centerY + 60, 48, 33, 0x00ff00);
    this.elements.push(tablet, tabletScreen);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 8: Mobile & Big Data', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra9Workspace(_config: WorkspaceConfig): void {
    // 2016-2020: AI - RGB everything, mechanical keyboard, multi-monitor
    this.createFuturisticWorkspace();

    // RGB LED strip
    const rgbStrip = this.scene.add.rectangle(this.centerX, this.centerY - 120, 300, 5, 0xff00ff);
    rgbStrip.setAlpha(0.8);
    this.elements.push(rgbStrip);

    // RGB glow
    const rgbGlow = this.scene.add.rectangle(this.centerX, this.centerY - 120, 300, 40, 0xff00ff, 0.2);
    this.elements.push(rgbGlow);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 9: AI Boom', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createEra10Workspace(_config: WorkspaceConfig): void {
    // 2021-2026: Technocratic - Holographic displays, futuristic
    this.createFuturisticWorkspace();

    // Holographic display effect
    const holo1 = this.scene.add.rectangle(this.centerX - 100, this.centerY - 20, 80, 100, 0x00ffff, 0.3);
    const holo2 = this.scene.add.rectangle(this.centerX + 20, this.centerY - 20, 80, 100, 0xff00ff, 0.3);
    this.elements.push(holo1, holo2);

    // Animated scan lines
    const scanLines = this.scene.add.graphics();
    for (let y = 0; y < 100; y += 4) {
      scanLines.fillStyle(0x00ffff, 0.1);
      scanLines.fillRect(this.centerX - 140, this.centerY - 70 + y, 160, 2);
    }
    this.elements.push(scanLines);

    const label = this.scene.add.text(this.centerX, this.centerY + 160, 'ERA 10: Technocratic Endgame', {
      fontSize: '12px',
      color: '#00ffff',
      fontFamily: 'monospace',
    });
    label.setOrigin(0.5);
    this.elements.push(label);
  }

  private createBasicWorkspace(): void {
    // Shared elements for eras 3-4
    const desk = this.scene.add.rectangle(this.centerX, this.centerY + 50, 280, 30, 0x666666);
    const chair = this.scene.add.rectangle(this.centerX + 30, this.centerY + 110, 60, 80, 0x555555);
    this.elements.push(desk, chair);
  }

  private createModernWorkspace(): void {
    // Shared elements for eras 6-8
    const desk = this.scene.add.rectangle(this.centerX, this.centerY + 50, 300, 35, 0x444444);
    
    // Ergonomic chair
    const chair = this.scene.add.rectangle(this.centerX + 40, this.centerY + 110, 70, 90, 0x222222);
    const chairBack = this.scene.add.rectangle(this.centerX + 40, this.centerY + 70, 10, 80, 0x222222);
    
    // Dual monitors
    const monitor1 = this.scene.add.rectangle(this.centerX - 80, this.centerY + 10, 100, 80, 0x111111);
    const screen1 = this.scene.add.rectangle(this.centerX - 80, this.centerY + 10, 95, 75, 0x000000);
    const glow1 = this.scene.add.rectangle(this.centerX - 80, this.centerY + 10, 95, 75, 0x0088ff, 0.2);
    
    const monitor2 = this.scene.add.rectangle(this.centerX + 30, this.centerY + 10, 100, 80, 0x111111);
    const screen2 = this.scene.add.rectangle(this.centerX + 30, this.centerY + 10, 95, 75, 0x000000);
    const glow2 = this.scene.add.rectangle(this.centerX + 30, this.centerY + 10, 95, 75, 0x00ff88, 0.2);
    
    this.elements.push(desk, chair, chairBack, monitor1, screen1, glow1, monitor2, screen2, glow2);
  }

  private createFuturisticWorkspace(): void {
    // Shared elements for eras 9-10
    const desk = this.scene.add.rectangle(this.centerX, this.centerY + 50, 320, 40, 0x222222);
    
    // Herman Miller chair (premium)
    const chair = this.scene.add.rectangle(this.centerX + 50, this.centerY + 110, 80, 100, 0x111111);
    
    // Triple monitor setup
    for (let i = 0; i < 3; i++) {
      const x = this.centerX - 120 + i * 120;
      const monitor = this.scene.add.rectangle(x, this.centerY + 5, 110, 90, 0x000000);
      const screen = this.scene.add.rectangle(x, this.centerY + 5, 105, 85, 0x000000);
      const glow = this.scene.add.rectangle(x, this.centerY + 5, 105, 85, 0x00ff00, 0.1 + i * 0.05);
      this.elements.push(monitor, screen, glow);
    }
    
    // Mechanical keyboard with RGB
    const keyboard = this.scene.add.rectangle(this.centerX - 40, this.centerY + 65, 140, 30, 0x000000);
    const kbGlow = this.scene.add.rectangle(this.centerX - 40, this.centerY + 65, 140, 30, 0xff00ff, 0.3);
    
    this.elements.push(desk, chair, keyboard, kbGlow);
  }

  /**
   * Clear all workspace elements
   */
  public clear(): void {
    this.elements.forEach(el => el.destroy());
    this.elements = [];
  }

  /**
   * Update workspace (e.g., when equipment changes)
   */
  public update(config: WorkspaceConfig): void {
    this.create(config);
  }
}
