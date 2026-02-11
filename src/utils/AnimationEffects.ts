import Phaser from 'phaser';

/**
 * AnimationEffects - Collection of reusable animation effects
 */
export class AnimationEffects {
  /**
   * Create a glitch text effect
   */
  static glitchText(scene: Phaser.Scene, text: Phaser.GameObjects.Text, duration: number = 2000): void {
    const originalText = text.text;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    const timer = scene.time.addEvent({
      delay: 50,
      callback: () => {
        if (Math.random() > 0.7) {
          let glitchedText = '';
          for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.8) {
              glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
              glitchedText += originalText[i];
            }
          }
          text.setText(glitchedText);
        } else {
          text.setText(originalText);
        }
      },
      loop: true,
    });

    scene.time.delayedCall(duration, () => {
      timer.destroy();
      text.setText(originalText);
    });
  }

  /**
   * Screen shake effect
   */
  static screenShake(scene: Phaser.Scene, intensity: number = 10, duration: number = 200): void {
    scene.cameras.main.shake(duration, intensity / 1000);
  }

  /**
   * Fade in effect
   */
  static fadeIn(scene: Phaser.Scene, gameObject: Phaser.GameObjects.GameObject, duration: number = 500): void {
    scene.tweens.add({
      targets: gameObject,
      alpha: { from: 0, to: 1 },
      duration: duration,
      ease: 'Power2',
    });
  }

  /**
   * Fade out effect
   */
  static fadeOut(scene: Phaser.Scene, gameObject: Phaser.GameObjects.GameObject, duration: number = 500): void {
    scene.tweens.add({
      targets: gameObject,
      alpha: { from: 1, to: 0 },
      duration: duration,
      ease: 'Power2',
    });
  }

  /**
   * Pulse effect
   */
  static pulse(scene: Phaser.Scene, gameObject: Phaser.GameObjects.GameObject, scale: number = 1.1, duration: number = 500): void {
    scene.tweens.add({
      targets: gameObject,
      scale: { from: 1, to: scale },
      duration: duration / 2,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /**
   * Float effect
   */
  static float(scene: Phaser.Scene, gameObject: Phaser.GameObjects.GameObject, distance: number = 10, duration: number = 2000): void {
    const startY = (gameObject as any).y;
    scene.tweens.add({
      targets: gameObject,
      y: startY - distance,
      duration: duration / 2,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /**
   * Typewriter text effect
   */
  static typewriter(scene: Phaser.Scene, text: Phaser.GameObjects.Text, fullText: string, speed: number = 50, onComplete?: () => void): void {
    let currentText = '';
    let index = 0;

    const timer = scene.time.addEvent({
      delay: speed,
      callback: () => {
        if (index < fullText.length) {
          currentText += fullText[index];
          text.setText(currentText);
          index++;
        } else {
          timer.destroy();
          if (onComplete) onComplete();
        }
      },
      loop: true,
    });
  }

  /**
   * Particle burst effect
   */
  static particleBurst(scene: Phaser.Scene, x: number, y: number, color: number = 0x00ff00, count: number = 20): void {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 100 + Math.random() * 100;
      
      const particle = scene.add.rectangle(x, y, 4, 4, color);
      particle.setDepth(1000);
      
      scene.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        alpha: 0,
        duration: 500 + Math.random() * 500,
        ease: 'Power2',
        onComplete: () => {
          particle.destroy();
        },
      });
    }
  }

  /**
   * Scan line effect for CRT monitors
   */
  static createScanLines(scene: Phaser.Scene, intensity: number = 0.1): Phaser.GameObjects.Graphics {
    const graphics = scene.add.graphics();
    graphics.setDepth(10001);
    
    const width = scene.cameras.main.width;
    const height = scene.cameras.main.height;
    
    graphics.fillStyle(0x000000, intensity);
    for (let y = 0; y < height; y += 4) {
      graphics.fillRect(0, y, width, 2);
    }
    
    return graphics;
  }

  /**
   * Create starfield background
   */
  static createStarfield(scene: Phaser.Scene, count: number = 100): void {
    const width = scene.cameras.main.width;
    const height = scene.cameras.main.height;
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1;
      const brightness = Math.random();
      
      const star = scene.add.circle(x, y, size, 0xffffff, brightness);
      star.setDepth(-100);
      
      // Twinkling effect
      scene.tweens.add({
        targets: star,
        alpha: Math.random() * 0.5,
        duration: 1000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
  }

  /**
   * Ripple effect
   */
  static ripple(scene: Phaser.Scene, x: number, y: number, color: number = 0x00ff00): void {
    const circle = scene.add.circle(x, y, 5, color, 0.8);
    circle.setDepth(999);
    
    scene.tweens.add({
      targets: circle,
      radius: 100,
      alpha: 0,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        circle.destroy();
      },
    });
  }

  /**
   * Matrix-style digital rain effect
   */
  static createMatrixRain(scene: Phaser.Scene, count: number = 20): void {
    const width = scene.cameras.main.width;
    const height = scene.cameras.main.height;
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const startY = -Math.random() * height;
      
      const column: Phaser.GameObjects.Text[] = [];
      const columnLength = 10 + Math.floor(Math.random() * 10);
      
      for (let j = 0; j < columnLength; j++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const text = scene.add.text(x, startY - j * 20, char, {
          fontSize: '16px',
          color: j === 0 ? '#ffffff' : '#00ff00',
          fontFamily: 'monospace',
        });
        text.setAlpha(j === 0 ? 1 : 0.5 - (j / columnLength * 0.5));
        text.setDepth(-50);
        column.push(text);
      }
      
      // Animate column falling
      scene.tweens.add({
        targets: column,
        y: '+=800',
        duration: 5000 + Math.random() * 5000,
        ease: 'Linear',
        repeat: -1,
        delay: Math.random() * 3000,
        onUpdate: () => {
          // Update characters randomly
          if (Math.random() > 0.95) {
            column.forEach(text => {
              text.setText(chars[Math.floor(Math.random() * chars.length)]);
            });
          }
        },
      });
    }
  }

  /**
   * Neon glow effect
   */
  static neonGlow(scene: Phaser.Scene, gameObject: Phaser.GameObjects.Text, color: string = '#00ff00'): void {
    const colors = [color, '#ffffff', color];
    let colorIndex = 0;

    scene.time.addEvent({
      delay: 100,
      callback: () => {
        gameObject.setColor(colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
      },
      loop: true,
    });
  }

  /**
   * Circuit board pattern background
   */
  static createCircuitPattern(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics();
    graphics.setDepth(-90);
    graphics.lineStyle(1, 0x003300, 0.3);

    const width = scene.cameras.main.width;
    const height = scene.cameras.main.height;
    const gridSize = 50;

    // Draw grid
    for (let x = 0; x < width; x += gridSize) {
      graphics.lineBetween(x, 0, x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      graphics.lineBetween(0, y, width, y);
    }

    // Add circuit nodes
    for (let i = 0; i < 30; i++) {
      const x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      
      graphics.fillStyle(0x00ff00, 0.5);
      graphics.fillCircle(x, y, 3);
      
      // Draw random connecting lines
      if (Math.random() > 0.5) {
        const endX = x + (Math.random() > 0.5 ? gridSize : -gridSize);
        graphics.lineStyle(2, 0x00ff00, 0.3);
        graphics.lineBetween(x, y, endX, y);
      }
      if (Math.random() > 0.5) {
        const endY = y + (Math.random() > 0.5 ? gridSize : -gridSize);
        graphics.lineStyle(2, 0x00ff00, 0.3);
        graphics.lineBetween(x, y, x, endY);
      }
    }
  }

  /**
   * Code scrolling background effect
   */
  static createScrollingCode(scene: Phaser.Scene, speed: number = 1): void {
    const codeLines = [
      'function hackTheMainframe() {',
      '  const data = fetchSecretData();',
      '  if (data.encrypted) {',
      '    return decrypt(data);',
      '  }',
      '}',
      '',
      'class QuantumComputer {',
      '  async process(qubits) {',
      '    return await this.superposition(qubits);',
      '  }',
      '}',
    ];

    const width = scene.cameras.main.width;
    let yPos = 100;

    codeLines.forEach((line, index) => {
      const text = scene.add.text(width + 100, yPos + index * 20, line, {
        fontSize: '12px',
        color: '#00aa00',
        fontFamily: 'monospace',
      });
      text.setAlpha(0.2);
      text.setDepth(-80);

      scene.tweens.add({
        targets: text,
        x: -200,
        duration: 15000 / speed,
        ease: 'Linear',
        repeat: -1,
      });
    });
  }

  /**
   * Holographic effect
   */
  static holographicEffect(scene: Phaser.Scene, gameObject: Phaser.GameObjects.GameObject): void {
    scene.tweens.add({
      targets: gameObject,
      alpha: { from: 0.7, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    scene.tweens.add({
      targets: gameObject,
      scaleY: { from: 1, to: 1.02 },
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /**
   * Data stream effect
   */
  static dataStream(scene: Phaser.Scene, x: number, y: number, direction: 'up' | 'down' | 'left' | 'right' = 'down'): void {
    const chars = '01';
    for (let i = 0; i < 10; i++) {
      scene.time.delayedCall(i * 100, () => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const text = scene.add.text(x, y, char, {
          fontSize: '14px',
          color: '#00ffff',
          fontFamily: 'monospace',
        });
        text.setDepth(500);

        const movement: any = { alpha: 0, duration: 1000, ease: 'Power2' };
        if (direction === 'down') movement.y = y + 100;
        else if (direction === 'up') movement.y = y - 100;
        else if (direction === 'left') movement.x = x - 100;
        else if (direction === 'right') movement.x = x + 100;

        scene.tweens.add({
          targets: text,
          ...movement,
          onComplete: () => text.destroy(),
        });
      });
    }
  }
}
