import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { BasementScene } from './scenes/BasementScene';
import { Era1Scene } from './scenes/Era1Scene';
import { Era2Scene } from './scenes/Era2Scene';
import { Era3Scene } from './scenes/Era3Scene';
import { Era4Scene } from './scenes/Era4Scene';
import { Era5Scene } from './scenes/Era5Scene';
import { Era6Scene } from './scenes/Era6Scene';
import { Era7Scene } from './scenes/Era7Scene';
import { Era8Scene } from './scenes/Era8Scene';
import { Era9Scene } from './scenes/Era9Scene';
import { Era10Scene } from './scenes/Era10Scene';
import { PunchCardMinigame } from './minigames/PunchCardMinigame';
import { WireRoutingMinigame } from './minigames/WireRoutingMinigame';
import { TerminalMinigame } from './minigames/TerminalMinigame';
import { BugHuntMinigame } from './minigames/BugHuntMinigame';
import { MergeConflictMinigame } from './minigames/MergeConflictMinigame';
import { RegexGolfMinigame } from './minigames/RegexGolfMinigame';
import { EndingScene } from './scenes/EndingScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#000000',
  pixelArt: true,
  scene: [
    BootScene,
    MainMenuScene,
    BasementScene,
    Era1Scene,
    Era2Scene,
    Era3Scene,
    Era4Scene,
    Era5Scene,
    Era6Scene,
    Era7Scene,
    Era8Scene,
    Era9Scene,
    Era10Scene,
    PunchCardMinigame,
    WireRoutingMinigame,
    TerminalMinigame,
    BugHuntMinigame,
    MergeConflictMinigame,
    RegexGolfMinigame,
    EndingScene,
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);
