export interface TypewriterConfig {
  speed: number; // characters per second
  sound?: boolean;
}

export class DialogSystem {
  private scene: Phaser.Scene;
  private textObject: Phaser.GameObjects.Text | null = null;
  private fullText: string = '';
  private currentIndex: number = 0;
  private timer: Phaser.Time.TimerEvent | null = null;
  private config: TypewriterConfig;
  private isComplete: boolean = false;
  private onCompleteCallback: (() => void) | null = null;
  
  constructor(scene: Phaser.Scene, config: TypewriterConfig = { speed: 30 }) {
    this.scene = scene;
    this.config = config;
  }
  
  showText(
    text: string,
    x: number,
    y: number,
    style: Phaser.Types.GameObjects.Text.TextStyle,
    onComplete?: () => void
  ): Phaser.GameObjects.Text {
    this.stopTypewriter();
    
    this.fullText = text;
    this.currentIndex = 0;
    this.isComplete = false;
    this.onCompleteCallback = onComplete || null;
    
    if (this.textObject) {
      this.textObject.destroy();
    }
    
    this.textObject = this.scene.add.text(x, y, '', style);
    this.startTypewriter();
    
    return this.textObject;
  }
  
  private startTypewriter(): void {
    if (!this.textObject) return;
    
    const delay = 1000 / this.config.speed;
    
    this.timer = this.scene.time.addEvent({
      delay: delay,
      callback: () => {
        if (this.currentIndex < this.fullText.length && this.textObject) {
          this.textObject.text += this.fullText[this.currentIndex];
          this.currentIndex++;
          
          // Simple typing sound effect
          if (this.config.sound && this.currentIndex % 2 === 0) {
            // Could play a sound here
          }
        } else {
          this.stopTypewriter();
          this.isComplete = true;
          if (this.onCompleteCallback) {
            this.onCompleteCallback();
          }
        }
      },
      loop: true,
    });
  }
  
  private stopTypewriter(): void {
    if (this.timer) {
      this.timer.destroy();
      this.timer = null;
    }
  }
  
  skipToEnd(): void {
    if (!this.textObject || this.isComplete) return;
    
    this.stopTypewriter();
    this.textObject.text = this.fullText;
    this.isComplete = true;
    
    if (this.onCompleteCallback) {
      this.onCompleteCallback();
    }
  }
  
  isTyping(): boolean {
    return !this.isComplete && this.timer !== null;
  }
  
  destroy(): void {
    this.stopTypewriter();
    if (this.textObject) {
      this.textObject.destroy();
      this.textObject = null;
    }
  }
}

// Dialog box component
export class DialogBox {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private background: Phaser.GameObjects.Rectangle;
  private nameText: Phaser.GameObjects.Text;
  private dialogSystem: DialogSystem;
  private options: Phaser.GameObjects.Text[] = [];
  private visible: boolean = false;
  
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    this.scene = scene;
    this.container = scene.add.container(x, y);
    
    // Background
    this.background = scene.add.rectangle(0, 0, width, height, 0x000000, 0.85);
    this.background.setStrokeStyle(2, 0x00ff00);
    
    // Speaker name
    this.nameText = scene.add.text(-width / 2 + 20, -height / 2 + 10, '', {
      fontSize: '16px',
      color: '#00ff00',
      fontFamily: 'monospace',
    });
    
    this.container.add([this.background, this.nameText]);
    this.container.setVisible(false);
    
    this.dialogSystem = new DialogSystem(scene);
  }
  
  show(speaker: string, text: string, onComplete?: () => void): void {
    this.visible = true;
    this.container.setVisible(true);
    this.nameText.text = speaker.toUpperCase();
    
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'monospace',
      wordWrap: { width: this.background.width - 40 },
    };
    
    const textObj = this.dialogSystem.showText(
      text,
      -this.background.width / 2 + 20,
      -this.background.height / 2 + 40,
      style,
      onComplete
    );
    
    this.container.add(textObj);
  }
  
  showWithOptions(
    speaker: string,
    text: string,
    optionTexts: string[],
    onOptionSelected: (index: number) => void
  ): void {
    this.show(speaker, text, () => {
      this.createOptions(optionTexts, onOptionSelected);
    });
  }
  
  private createOptions(optionTexts: string[], onOptionSelected: (index: number) => void): void {
    this.clearOptions();
    
    const startY = this.background.height / 2 - 100;
    
    optionTexts.forEach((text, index) => {
      const optionText = this.scene.add.text(
        -this.background.width / 2 + 40,
        startY + index * 30,
        `> ${text}`,
        {
          fontSize: '14px',
          color: '#ffff00',
          fontFamily: 'monospace',
        }
      );
      
      optionText.setInteractive({ useHandCursor: true });
      optionText.on('pointerover', () => {
        optionText.setColor('#00ff00');
      });
      optionText.on('pointerout', () => {
        optionText.setColor('#ffff00');
      });
      optionText.on('pointerdown', () => {
        onOptionSelected(index);
        this.hide();
      });
      
      this.options.push(optionText);
      this.container.add(optionText);
    });
  }
  
  private clearOptions(): void {
    this.options.forEach(opt => opt.destroy());
    this.options = [];
  }
  
  hide(): void {
    this.visible = false;
    this.container.setVisible(false);
    this.clearOptions();
    this.dialogSystem.destroy();
  }
  
  skip(): void {
    if (this.dialogSystem.isTyping()) {
      this.dialogSystem.skipToEnd();
    }
  }
  
  isVisible(): boolean {
    return this.visible;
  }
  
  destroy(): void {
    this.dialogSystem.destroy();
    this.clearOptions();
    this.container.destroy();
  }
}
