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
}
