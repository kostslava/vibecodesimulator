import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { getMissionById } from '../data/missions';
import { NotificationSystem } from '../systems/NotificationSystem';

/**
 * Display mission completion results with detailed feedback
 */
export function showMissionResults(
  scene: Phaser.Scene,
  missionId: string,
  success: boolean,
  onComplete: () => void
): void {
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;

  // Dark overlay
  scene.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0);

  // Result header
  const resultText = success ? 'MISSION COMPLETE!' : 'MISSION FAILED!';
  const resultColor = success ? '#00ff00' : '#ff0000';

  const headerText = scene.add.text(width / 2, height / 2 - 120, resultText, {
    fontSize: '48px',
    color: resultColor,
    fontFamily: 'monospace',
  }).setOrigin(0.5);

  // Entrance animation
  headerText.setScale(0);
  scene.tweens.add({
    targets: headerText,
    scale: 1,
    duration: 300,
    ease: 'Back.easeOut',
  });

  let detailY = height / 2 - 40;

  if (success) {
    const mission = getMissionById(missionId);
    if (mission) {
      const state = useGameStore.getState();
      const oldMoney = state.money;

      // Update state
      state.addMoney(mission.reward.money);
      state.completeMission(missionId);
      state.incrementStat('minigamesWon');
      state.incrementStat('projectsCompleted');

      // Show money reward with animation
      const moneyText = scene.add.text(width / 2, detailY, `💰 +$${mission.reward.money}`, {
        fontSize: '32px',
        color: '#ffff00',
        fontFamily: 'monospace',
      }).setOrigin(0.5);
      
      moneyText.setAlpha(0);
      moneyText.setScale(0.5);
      scene.tweens.add({
        targets: moneyText,
        alpha: 1,
        scale: 1,
        duration: 400,
        ease: 'Back.easeOut',
        delay: 300,
      });
      
      detailY += 45;

      const balanceText = scene.add.text(width / 2, detailY, `Money: $${oldMoney} → $${state.money}`, {
        fontSize: '18px',
        color: '#00ff00',
        fontFamily: 'monospace',
      }).setOrigin(0.5);
      
      balanceText.setAlpha(0);
      scene.tweens.add({
        targets: balanceText,
        alpha: 1,
        duration: 300,
        delay: 500,
      });
      
      detailY += 35;

      // Show reputation changes with animations
      if (mission.reward.reputation.length > 0) {
        const repTitle = scene.add.text(width / 2, detailY, 'REPUTATION CHANGES:', {
          fontSize: '16px',
          color: '#00aaff',
          fontFamily: 'monospace',
        }).setOrigin(0.5);
        
        repTitle.setAlpha(0);
        scene.tweens.add({
          targets: repTitle,
          alpha: 1,
          duration: 300,
          delay: 700,
        });
        
        detailY += 25;

        mission.reward.reputation.forEach((rep, index) => {
          const oldRep = (state.reputation as any)[rep.type];
          state.updateReputation(rep.type as keyof typeof state.reputation, rep.amount);
          const newRep = (state.reputation as any)[rep.type];

          const repText = scene.add.text(width / 2, detailY, 
            `${rep.type}: ${oldRep} → ${newRep} (${rep.amount > 0 ? '+' : ''}${rep.amount})`, {
            fontSize: '14px',
            color: rep.amount > 0 ? '#00ff00' : '#ff8800',
            fontFamily: 'monospace',
          }).setOrigin(0.5);
          
          repText.setAlpha(0);
          scene.tweens.add({
            targets: repText,
            alpha: 1,
            duration: 300,
            delay: 900 + (index * 150),
          });
          
          detailY += 22;
        });
      }

      // Show conspiracy document discovery with dramatic effect
      if (mission.conspiracyReveal) {
        state.discoverDocument(mission.conspiracyReveal.documentId);
        detailY += 10;
        
        const docText = scene.add.text(width / 2, detailY, '📄 CLASSIFIED DOCUMENT DISCOVERED!', {
          fontSize: '16px',
          color: '#ff00ff',
          fontFamily: 'monospace',
        }).setOrigin(0.5);
        
        docText.setAlpha(0);
        docText.setScale(0.8);
        scene.tweens.add({
          targets: docText,
          alpha: 1,
          scale: 1,
          duration: 400,
          ease: 'Back.easeOut',
          delay: 1500,
        });
        
        // Pulse effect
        scene.tweens.add({
          targets: docText,
          scale: 1.1,
          duration: 500,
          yoyo: true,
          repeat: 2,
          delay: 1900,
        });
        
        detailY += 25;
        
        const docIdText = scene.add.text(width / 2, detailY, mission.conspiracyReveal.documentId, {
          fontSize: '12px',
          color: '#ff88ff',
          fontFamily: 'monospace',
        }).setOrigin(0.5);
        
        docIdText.setAlpha(0);
        scene.tweens.add({
          targets: docIdText,
          alpha: 1,
          duration: 300,
          delay: 1700,
        });

        // Show notification for conspiracy discovery
        scene.time.delayedCall(2000, () => {
          const notifSystem = new NotificationSystem(scene);
          notifSystem.show({
            title: 'Conspiracy Document Found',
            message: `You discovered: ${mission.conspiracyReveal!.documentId}`,
            type: 'conspiracy',
            duration: 3000,
          });
        });
      }
    }
  } else {
    useGameStore.getState().incrementStat('minigamesLost');

    // Show failure message with fade in
    const failText = scene.add.text(width / 2, detailY, 'No rewards earned', {
      fontSize: '24px',
      color: '#ff8800',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
    
    failText.setAlpha(0);
    scene.tweens.add({
      targets: failText,
      alpha: 1,
      duration: 400,
      delay: 300,
    });
    
    detailY += 40;

    const warningText = scene.add.text(width / 2, detailY, 'Mission failure may affect opportunities', {
      fontSize: '14px',
      color: '#888888',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
    
    warningText.setAlpha(0);
    scene.tweens.add({
      targets: warningText,
      alpha: 1,
      duration: 400,
      delay: 500,
    });
  }

  // Continue instruction with pulse
  const continueText = scene.add.text(width / 2, height - 80, 'Press SPACE to continue', {
    fontSize: '20px',
    color: '#ffffff',
    fontFamily: 'monospace',
  }).setOrigin(0.5);
  
  continueText.setAlpha(0);
  scene.tweens.add({
    targets: continueText,
    alpha: 1,
    duration: 400,
    delay: 1000,
  });
  
  scene.tweens.add({
    targets: continueText,
    alpha: 0.5,
    duration: 800,
    yoyo: true,
    repeat: -1,
    delay: 1400,
  });

  // Wait for space key
  scene.input.keyboard?.once('keydown-SPACE', () => {
    onComplete();
  });
}
