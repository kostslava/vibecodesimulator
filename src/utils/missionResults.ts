import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';
import { getMissionById } from '../data/missions';

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

  scene.add.text(width / 2, height / 2 - 120, resultText, {
    fontSize: '48px',
    color: resultColor,
    fontFamily: 'monospace',
  }).setOrigin(0.5);

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

      // Show money reward
      scene.add.text(width / 2, detailY, `💰 +$${mission.reward.money}`, {
        fontSize: '32px',
        color: '#ffff00',
        fontFamily: 'monospace',
      }).setOrigin(0.5);
      detailY += 45;

      scene.add.text(width / 2, detailY, `Money: $${oldMoney} → $${state.money}`, {
        fontSize: '18px',
        color: '#00ff00',
        fontFamily: 'monospace',
      }).setOrigin(0.5);
      detailY += 35;

      // Show reputation changes
      if (mission.reward.reputation.length > 0) {
        scene.add.text(width / 2, detailY, 'REPUTATION CHANGES:', {
          fontSize: '16px',
          color: '#00aaff',
          fontFamily: 'monospace',
        }).setOrigin(0.5);
        detailY += 25;

        mission.reward.reputation.forEach(rep => {
          const oldRep = (state.reputation as any)[rep.type];
          state.updateReputation(rep.type as keyof typeof state.reputation, rep.amount);
          const newRep = (state.reputation as any)[rep.type];

          scene.add.text(width / 2, detailY, `${rep.type}: ${oldRep} → ${newRep} (${rep.amount > 0 ? '+' : ''}${rep.amount})`, {
            fontSize: '14px',
            color: rep.amount > 0 ? '#00ff00' : '#ff8800',
            fontFamily: 'monospace',
          }).setOrigin(0.5);
          detailY += 22;
        });
      }

      // Show conspiracy document discovery
      if (mission.conspiracyReveal) {
        state.discoverDocument(mission.conspiracyReveal.documentId);
        detailY += 10;
        scene.add.text(width / 2, detailY, '📄 CLASSIFIED DOCUMENT DISCOVERED!', {
          fontSize: '16px',
          color: '#ff00ff',
          fontFamily: 'monospace',
        }).setOrigin(0.5);
        detailY += 25;
        
        scene.add.text(width / 2, detailY, mission.conspiracyReveal.documentId, {
          fontSize: '12px',
          color: '#ff88ff',
          fontFamily: 'monospace',
        }).setOrigin(0.5);
      }
    }
  } else {
    useGameStore.getState().incrementStat('minigamesLost');

    // Show failure message
    scene.add.text(width / 2, detailY, 'No rewards earned', {
      fontSize: '24px',
      color: '#ff8800',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
    detailY += 40;

    scene.add.text(width / 2, detailY, 'Mission failure may affect opportunities', {
      fontSize: '14px',
      color: '#888888',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
  }

  // Continue instruction
  scene.add.text(width / 2, height - 80, 'Press SPACE to continue', {
    fontSize: '20px',
    color: '#ffffff',
    fontFamily: 'monospace',
  }).setOrigin(0.5);

  // Wait for space key
  scene.input.keyboard?.once('keydown-SPACE', () => {
    onComplete();
  });
}
