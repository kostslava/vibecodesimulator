import Phaser from 'phaser';

export interface Notification {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'conspiracy' | 'equipment' | 'achievement';
  duration?: number;
}

/**
 * NotificationSystem - Creates Undertale-style popup notifications
 * Features: typewriter effect, icons, animations, sound effects
 */
export class NotificationSystem {
  private scene: Phaser.Scene;
  private activeNotifications: Phaser.GameObjects.Container[] = [];
  private notificationQueue: Notification[] = [];
  private isShowing: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Show a notification with typewriter effect
   */
  public show(notification: Notification): void {
    this.notificationQueue.push(notification);
    if (!this.isShowing) {
      this.showNext();
    }
  }

  private showNext(): void {
    if (this.notificationQueue.length === 0) {
      this.isShowing = false;
      return;
    }

    this.isShowing = true;
    const notification = this.notificationQueue.shift()!;
    const duration = notification.duration || 3000;

    const width = this.scene.cameras.main.width;

    // Create container
    const container = this.scene.add.container(width / 2, -100);
    container.setDepth(10000); // Always on top

    // Background with border
    const bgWidth = 500;
    const bgHeight = 120;
    const bg = this.scene.add.rectangle(0, 0, bgWidth, bgHeight, 0x000000, 0.95);
    bg.setStrokeStyle(3, this.getColorForType(notification.type));
    container.add(bg);

    // Icon
    const icon = this.getIconForType(notification.type);
    const iconText = this.scene.add.text(-bgWidth / 2 + 30, -bgHeight / 2 + 20, icon, {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'monospace',
    });
    container.add(iconText);

    // Title
    const titleText = this.scene.add.text(-bgWidth / 2 + 70, -bgHeight / 2 + 15, notification.title.toUpperCase(), {
      fontSize: '18px',
      color: this.getColorHexForType(notification.type),
      fontFamily: 'monospace',
      fontStyle: 'bold',
    });
    container.add(titleText);

    // Message with typewriter effect
    const messageText = this.scene.add.text(-bgWidth / 2 + 70, -bgHeight / 2 + 45, '', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'monospace',
      wordWrap: { width: bgWidth - 90 },
    });
    container.add(messageText);

    // Slide in animation
    this.scene.tweens.add({
      targets: container,
      y: 100,
      duration: 300,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Typewriter effect
        this.typewriterEffect(messageText, notification.message, () => {
          // Hold for duration, then slide out
          this.scene.time.delayedCall(duration, () => {
            this.scene.tweens.add({
              targets: container,
              y: -100,
              alpha: 0,
              duration: 300,
              ease: 'Back.easeIn',
              onComplete: () => {
                container.destroy();
                this.activeNotifications = this.activeNotifications.filter(n => n !== container);
                this.showNext();
              },
            });
          });
        });
      },
    });

    this.activeNotifications.push(container);
  }

  private typewriterEffect(textObject: Phaser.GameObjects.Text, fullText: string, onComplete: () => void): void {
    let currentText = '';
    let index = 0;
    const speed = 30; // milliseconds per character

    const timer = this.scene.time.addEvent({
      delay: speed,
      callback: () => {
        if (index < fullText.length) {
          currentText += fullText[index];
          textObject.setText(currentText);
          index++;
        } else {
          timer.destroy();
          onComplete();
        }
      },
      loop: true,
    });
  }

  private getIconForType(type: Notification['type']): string {
    const icons = {
      info: 'ℹ️',
      success: '✓',
      warning: '⚠️',
      conspiracy: '📄',
      equipment: '🔧',
      achievement: '🏆',
    };
    return icons[type] || 'ℹ️';
  }

  private getColorForType(type: Notification['type']): number {
    const colors = {
      info: 0x00aaff,
      success: 0x00ff00,
      warning: 0xffaa00,
      conspiracy: 0xff00ff,
      equipment: 0xffff00,
      achievement: 0xffd700,
    };
    return colors[type] || 0x00aaff;
  }

  private getColorHexForType(type: Notification['type']): string {
    const colors = {
      info: '#00aaff',
      success: '#00ff00',
      warning: '#ffaa00',
      conspiracy: '#ff00ff',
      equipment: '#ffff00',
      achievement: '#ffd700',
    };
    return colors[type] || '#00aaff';
  }

  /**
   * Clear all notifications
   */
  public clearAll(): void {
    this.activeNotifications.forEach(container => container.destroy());
    this.activeNotifications = [];
    this.notificationQueue = [];
    this.isShowing = false;
  }
}
