import Phaser from 'phaser';

export interface TutorialStep {
  title: string;
  message: string;
  highlight?: { x: number; y: number; width: number; height: number };
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  skipable?: boolean;
}

/**
 * TutorialSystem - Interactive tutorial with highlights and step-by-step guidance
 */
export class TutorialSystem {
  private scene: Phaser.Scene;
  private currentStep: number = 0;
  private steps: TutorialStep[] = [];
  private container: Phaser.GameObjects.Container | null = null;
  private overlay: Phaser.GameObjects.Rectangle | null = null;
  private highlightGraphics: Phaser.GameObjects.Graphics | null = null;
  private onComplete: (() => void) | null = null;
  private spaceKey: Phaser.Input.Keyboard.Key | null = null;
  private escKey: Phaser.Input.Keyboard.Key | null = null;
  private typewriterTimer: Phaser.Time.TimerEvent | null = null;
  private entranceTween: Phaser.Tweens.Tween | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Start tutorial with given steps
   */
  public start(steps: TutorialStep[], onComplete?: () => void): void {
    this.steps = steps;
    this.currentStep = 0;
    this.onComplete = onComplete || null;
    this.showStep(0);
  }

  private showStep(stepIndex: number): void {
    if (stepIndex >= this.steps.length) {
      this.complete();
      return;
    }

    const step = this.steps[stepIndex];
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;

    // Clear previous
    this.clear();

    // Create dark overlay
    this.overlay = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.8);
    this.overlay.setOrigin(0);
    this.overlay.setDepth(9000);
    this.overlay.setInteractive();

    // Create highlight if specified
    if (step.highlight) {
      this.highlightGraphics = this.scene.add.graphics();
      this.highlightGraphics.setDepth(9001);
      
      // Cut out highlighted area
      this.highlightGraphics.fillStyle(0x000000, 0);
      this.highlightGraphics.fillRect(
        step.highlight.x,
        step.highlight.y,
        step.highlight.width,
        step.highlight.height
      );
      
      // Add glowing border around highlight
      this.highlightGraphics.lineStyle(3, 0x00ff00, 1);
      this.highlightGraphics.strokeRect(
        step.highlight.x - 5,
        step.highlight.y - 5,
        step.highlight.width + 10,
        step.highlight.height + 10
      );
    }

    // Create tutorial box
    const boxWidth = 600;
    const boxHeight = 200;
    let boxX = width / 2;
    let boxY = height / 2;

    // Position based on preference
    if (step.position === 'top') boxY = 150;
    else if (step.position === 'bottom') boxY = height - 150;
    else if (step.position === 'left') boxX = boxWidth / 2 + 50;
    else if (step.position === 'right') boxX = width - boxWidth / 2 - 50;

    this.container = this.scene.add.container(boxX, boxY);
    this.container.setDepth(9500);

    // Background with gradient effect (simulated with multiple rectangles)
    const bg = this.scene.add.rectangle(0, 0, boxWidth, boxHeight, 0x111111, 1);
    bg.setStrokeStyle(4, 0x00ff00);
    this.container.add(bg);

    // Add inner glow effect
    const innerGlow = this.scene.add.rectangle(0, 0, boxWidth - 8, boxHeight - 8, 0x001100, 0.3);
    this.container.add(innerGlow);

    // Add corner decorations for cyberpunk feel
    const cornerSize = 15;
    const corners = [
      { x: -boxWidth / 2, y: -boxHeight / 2 },
      { x: boxWidth / 2, y: -boxHeight / 2 },
      { x: -boxWidth / 2, y: boxHeight / 2 },
      { x: boxWidth / 2, y: boxHeight / 2 },
    ];
    corners.forEach(corner => {
      const cornerRect = this.scene.add.rectangle(corner.x, corner.y, cornerSize, cornerSize, 0x00ff00, 1);
      if (this.container) {
        this.container.add(cornerRect);
      }
    });

    // Step counter
    const stepCounter = this.scene.add.text(-boxWidth / 2 + 20, -boxHeight / 2 + 15, 
      `TUTORIAL ${stepIndex + 1}/${this.steps.length}`, {
      fontSize: '14px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });
    if (this.container) {
      this.container.add(stepCounter);
    }

    // Title
    const title = this.scene.add.text(0, -boxHeight / 2 + 45, step.title, {
      fontSize: '24px',
      color: '#00ff00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5, 0);
    if (this.container) {
      this.container.add(title);
    }

    // Message with typewriter effect
    const messageText = this.scene.add.text(0, -boxHeight / 2 + 85, '', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
      wordWrap: { width: boxWidth - 60 },
      align: 'center',
    });
    messageText.setOrigin(0.5, 0);
    if (this.container) {
      this.container.add(messageText);
    }

    // Typewriter effect
    this.typewriterEffect(messageText, step.message);

    // Continue button
    const continueText = stepIndex < this.steps.length - 1 ? 'NEXT →' : 'FINISH';
    const continueBtn = this.scene.add.text(0, boxHeight / 2 - 30, `[SPACE] ${continueText}`, {
      fontSize: '18px',
      color: '#ffff00',
      fontFamily: 'monospace',
    });
    continueBtn.setOrigin(0.5);
    if (this.container) {
      this.container.add(continueBtn);
    }

    // Skip button (if allowed)
    if (step.skipable !== false) {
      const skipBtn = this.scene.add.text(boxWidth / 2 - 100, boxHeight / 2 - 30, '[ESC] SKIP', {
        fontSize: '14px',
        color: '#888888',
        fontFamily: 'monospace',
      });
      if (this.container) {
        this.container.add(skipBtn);
      }
    }

    // Keyboard controls - properly clean up previous keys
    this.cleanupKeyboardListeners();
    
    this.spaceKey = this.scene.input.keyboard?.addKey('SPACE') || null;
    if (this.spaceKey) {
      this.spaceKey.once('down', () => {
        this.currentStep++;
        this.showStep(this.currentStep);
      });
    }

    this.escKey = this.scene.input.keyboard?.addKey('ESC') || null;
    if (this.escKey) {
      this.escKey.once('down', () => {
        if (step.skipable !== false) {
          this.complete();
        }
      });
    }

    // Entrance animation
    this.container.setAlpha(0);
    this.container.setScale(0.8);
    this.entranceTween = this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      scale: 1,
      duration: 300,
      ease: 'Back.easeOut',
    });
  }

  private typewriterEffect(textObject: Phaser.GameObjects.Text, fullText: string): void {
    // Clean up previous typewriter timer
    if (this.typewriterTimer) {
      this.typewriterTimer.destroy();
      this.typewriterTimer = null;
    }

    let currentText = '';
    let index = 0;
    const speed = 20;

    this.typewriterTimer = this.scene.time.addEvent({
      delay: speed,
      callback: () => {
        if (index < fullText.length) {
          currentText += fullText[index];
          textObject.setText(currentText);
          index++;
        } else {
          if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
            this.typewriterTimer = null;
          }
        }
      },
      loop: true,
    });
  }

  private cleanupKeyboardListeners(): void {
    if (this.spaceKey) {
      this.spaceKey.removeAllListeners();
      this.scene.input.keyboard?.removeKey(this.spaceKey);
      this.spaceKey = null;
    }
    if (this.escKey) {
      this.escKey.removeAllListeners();
      this.scene.input.keyboard?.removeKey(this.escKey);
      this.escKey = null;
    }
  }

  private clear(): void {
    // Clean up keyboard listeners
    this.cleanupKeyboardListeners();

    // Clean up typewriter timer
    if (this.typewriterTimer) {
      this.typewriterTimer.destroy();
      this.typewriterTimer = null;
    }

    // Clean up entrance tween
    if (this.entranceTween) {
      this.entranceTween.stop();
      this.entranceTween = null;
    }

    // Clean up graphics
    if (this.highlightGraphics) {
      this.highlightGraphics.destroy();
      this.highlightGraphics = null;
    }

    // Clean up container
    if (this.container) {
      this.container.destroy();
      this.container = null;
    }

    // Clean up overlay
    if (this.overlay) {
      this.overlay.destroy();
      this.overlay = null;
    }
  }

  private complete(): void {
    this.clear();
    if (this.onComplete) {
      this.onComplete();
    }
  }

  /**
   * Skip tutorial immediately
   */
  public skip(): void {
    this.complete();
  }

  /**
   * Destroy tutorial system and clean up resources
   */
  public destroy(): void {
    this.clear();
    this.steps = [];
    this.currentStep = 0;
    this.onComplete = null;
  }
}
