# Vibe Code Simulator - Code Structure Guide

## Architecture Overview

This is a Phaser 3-based web game built with TypeScript, Vite, and Zustand for state management. The architecture follows a scene-based structure with centralized state management.

## Directory Structure

```
vibe-code-simulator/
├── public/
│   └── assets/              # Static assets (sprites, audio, fonts)
│       ├── sprites/         # Character and environment sprites
│       ├── ui/              # UI elements
│       ├── audio/           # Music and SFX
│       └── fonts/           # Custom fonts
│
├── src/
│   ├── main.ts              # Entry point, Phaser config
│   │
│   ├── scenes/              # Phaser scenes (game states)
│   │   ├── BootScene.ts           # Asset loading
│   │   ├── MainMenuScene.ts       # Title screen
│   │   ├── BasementScene.ts       # Hub/base
│   │   ├── Era1Scene.ts           # 1945-1950
│   │   ├── Era2Scene.ts           # 1951-1960
│   │   ├── Era3Scene.ts           # 1961-1970
│   │   ├── Era4Scene.ts           # 1971-1980
│   │   ├── Era5Scene.ts           # 1981-1990
│   │   ├── Era6Scene.ts           # 1991-2000
│   │   ├── Era7Scene.ts           # 2001-2010
│   │   ├── Era8Scene.ts           # 2011-2015
│   │   ├── Era9Scene.ts           # 2016-2020
│   │   ├── Era10Scene.ts          # 2021-2026
│   │   └── EndingScene.ts         # Ending cinematics
│   │
│   ├── minigames/           # Interactive coding challenges
│   │   ├── PunchCardMinigame.ts
│   │   ├── WireRoutingMinigame.ts
│   │   ├── TerminalMinigame.ts
│   │   ├── BugHuntMinigame.ts
│   │   ├── MergeConflictMinigame.ts
│   │   └── RegexGolfMinigame.ts
│   │
│   ├── systems/             # Core game systems
│   │   ├── DialogSystem.ts        # Typewriter effect, dialog boxes
│   │   └── SaveLoadSystem.ts      # LocalStorage persistence
│   │
│   ├── store/               # Zustand state management
│   │   └── gameStore.ts           # Global game state
│   │
│   ├── data/                # Game content (data-driven)
│   │   ├── missions.ts            # Mission definitions
│   │   ├── npcs.ts                # NPC data and dialog trees
│   │   ├── equipment.ts           # Upgrade definitions
│   │   ├── conspiracy.ts          # Investigation documents
│   │   └── endings.ts             # Ending conditions
│   │
│   └── utils/               # Helper functions
│       └── (future utilities)
│
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── tailwind.config.js       # Tailwind CSS config
└── postcss.config.js        # PostCSS config
```

## Key Components

### 1. Entry Point (`main.ts`)

```typescript
// Configures Phaser game instance
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,        // WebGL or Canvas
  width: 1280,
  height: 720,
  scene: [...allScenes],    // All game scenes
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);
```

**Responsibilities:**
- Initialize Phaser game instance
- Register all scenes
- Configure game settings
- Set up scaling/display

### 2. State Management (`store/gameStore.ts`)

Uses Zustand for global state:

```typescript
interface GameState {
  // Player data
  playerName: string;
  currentEra: number;
  money: number;
  equipment: string[];
  
  // Progression
  completedMissions: string[];
  reputation: ReputationSystem;
  relationships: Record<string, Relationship>;
  
  // Investigation
  discoveredDocuments: string[];
  conspiracyCompletion: number;
  
  // Actions (mutations)
  setPlayerName: (name: string) => void;
  addMoney: (amount: number) => void;
  completeMission: (id: string) => void;
  // ... more actions
}
```

**Usage in Scenes:**
```typescript
import { useGameStore } from '../store/gameStore';

const state = useGameStore.getState();
state.addMoney(100);
```

**Why Zustand?**
- Simple API, minimal boilerplate
- Works outside React (pure TS/JS)
- Centralized state for complex game
- Easy debugging and serialization

### 3. Scene Architecture

All scenes extend `Phaser.Scene`:

```typescript
export class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MyScene' });
  }

  // Optional: Receive data from previous scene
  init(data: any): void {
    // Initialize scene with passed data
  }

  // Optional: Load assets
  preload(): void {
    // this.load.image('key', 'path');
  }

  // Required: Set up scene
  create(): void {
    // Add game objects, set up interactions
  }

  // Optional: Frame-by-frame updates
  update(time: number, delta: number): void {
    // Game loop logic
  }
}
```

**Scene Transitions:**
```typescript
// Start new scene, destroy current
this.scene.start('NextScene', { data: value });

// Run scene in parallel
this.scene.launch('OverlayScene');

// Stop scene
this.scene.stop('SceneKey');
```

### 4. Data-Driven Content

All game content stored in `src/data/`:

**Missions** (`missions.ts`):
```typescript
export const missions: Mission[] = [
  {
    id: 'era1_main',
    era: 1,
    title: 'Artillery Trajectory Tables',
    client: 'U.S. Army',
    // ... mission details
    minigameType: 'punchcard',
    reward: { money: 500, reputation: [...] },
  },
];
```

**NPCs** (`npcs.ts`):
```typescript
export const npcs: NPC[] = [
  {
    id: 'betty_johnson',
    name: 'Betty Johnson',
    dialogTrees: {
      first_meeting: [
        {
          id: 'betty_intro',
          text: 'Welcome! Let me show you ENIAC...',
          options: [/* choices */],
        },
      ],
    },
  },
];
```

**Benefits:**
- Easy content updates without code changes
- Clear separation of data and logic
- Enables future content editor tools
- Simple to test and validate

### 5. Minigame Structure

Each minigame is a self-contained scene:

```typescript
export class MyMinigame extends Phaser.Scene {
  private missionId: string = '';
  
  init(data: { missionId: string }): void {
    this.missionId = data.missionId;
  }
  
  create(): void {
    // Set up minigame UI
    // Add interactivity
    // Start timer
  }
  
  private checkWinCondition(): void {
    // Evaluate player performance
    if (playerWon) {
      this.missionComplete(true);
    }
  }
  
  private missionComplete(success: boolean): void {
    // Award money, reputation
    // Update game state
    // Return to basement
    if (success) {
      const mission = getMissionById(this.missionId);
      const state = useGameStore.getState();
      state.addMoney(mission.reward.money);
      state.completeMission(this.missionId);
    }
    this.scene.start('BasementScene');
  }
}
```

**Common Patterns:**
- Receive mission ID via `init()`
- Set up UI and game objects in `create()`
- Track player actions
- Evaluate win/loss condition
- Update global state on completion
- Transition back to hub scene

### 6. Dialog System

Reusable system for NPC conversations:

```typescript
import { DialogBox } from '../systems/DialogSystem';

// In scene create():
this.dialogBox = new DialogBox(this, x, y, width, height);

// Show simple text:
this.dialogBox.show('Betty', 'Welcome to ENIAC!');

// Show with choices:
this.dialogBox.showWithOptions(
  'Betty',
  'What would you like to learn?',
  ['Programming', 'Hardware', 'History'],
  (index) => {
    // Handle player choice
  }
);

// Hide dialog:
this.dialogBox.hide();
```

**Features:**
- Typewriter effect
- Player choice branches
- Automatic word wrapping
- Skip to end on click
- Relationship effects

### 7. Save/Load System

LocalStorage-based persistence:

```typescript
import { SaveLoadSystem } from '../systems/SaveLoadSystem';

// Save to slot 0-2:
SaveLoadSystem.saveGame(0);

// Load from slot:
SaveLoadSystem.loadGame(0);

// Auto-save (special slot):
SaveLoadSystem.autoSave();

// Check if save exists:
const saveInfo = SaveLoadSystem.getSaveInfo(0);
if (saveInfo) {
  console.log(saveInfo.playerName, saveInfo.currentEra);
}
```

**Save Data Includes:**
- Player name, current era
- Money, equipment
- Completed missions
- All relationships
- Reputation scores
- Investigation progress
- Major choices made
- Statistics

## Data Flow

### Mission Completion Flow

```
User selects mission in BasementScene
    ↓
BasementScene.startMission(missionId)
    ↓
Launch appropriate minigame scene with mission data
    ↓
Player completes minigame
    ↓
Minigame updates global state:
  - useGameStore.addMoney()
  - useGameStore.completeMission()
  - useGameStore.updateReputation()
  - useGameStore.discoverDocument()
    ↓
Return to BasementScene
    ↓
BasementScene shows updated stats
```

### Ending Determination Flow

```
Player advances through all 10 eras
    ↓
Click "Next Era" in Era 10
    ↓
BasementScene.nextEra() called
    ↓
Load EndingScene
    ↓
EndingScene.create() calls checkEnding()
    ↓
checkEnding() evaluates:
  - Reputation scores
  - Conspiracy completion %
  - Money total
  - Major choices made
    ↓
Returns matching Ending object
    ↓
Display ending text, epilogue, stats
```

## Best Practices

### Adding New Content

**New Mission:**
1. Add mission object to `src/data/missions.ts`
2. Assign to appropriate era
3. Specify minigame type
4. Define rewards and conspiracy reveals
5. Mission automatically appears in Project Board

**New NPC:**
1. Add NPC to `src/data/npcs.ts`
2. Define dialog trees with branching
3. Specify which eras they appear in
4. Add relationship effects to dialog options
5. Reference in mission briefings or scenes

**New Equipment:**
1. Add to `src/data/equipment.ts`
2. Specify era, cost, effects
3. Automatically appears in Equipment Shop
4. Effects auto-calculated by `calculateEquipmentEffects()`

**New Ending:**
1. Add to `src/data/endings.ts`
2. Define condition function
3. Write title, description, epilogue
4. Tested by `checkEnding()` function

### Performance Optimization

**Asset Loading:**
- Use sprite atlases for multiple images
- Load assets in BootScene, not per-scene
- Lazy load era-specific assets

**State Updates:**
- Batch related state changes
- Use selective subscriptions (not implemented in MVP)
- Debounce frequent updates

**Scene Management:**
- Stop unused scenes to free memory
- Use scene.launch() for overlays, not duplicate scenes
- Clean up event listeners in scene shutdown

### Debugging

**Zustand DevTools:**
```typescript
// Add to gameStore.ts for debugging:
import { devtools } from 'zustand/middleware';

export const useGameStore = create(
  devtools((set, get) => ({
    // ... store implementation
  }))
);
```

**Phaser Debug:**
```typescript
// In create():
this.input.keyboard?.on('keydown-D', () => {
  console.log('Current state:', useGameStore.getState());
});
```

**Common Issues:**
- Scene not changing: Check scene key spelling
- State not updating: Ensure using `set()` in store
- Minigame not starting: Verify mission ID passed correctly
- Assets not loading: Check file paths in preload()

## Testing

### Manual Testing Checklist

- [ ] New game flow (name input → basement → mission → minigame)
- [ ] Save/load in each era
- [ ] Each minigame win/loss
- [ ] Equipment purchases deduct money
- [ ] Reputation changes persist
- [ ] Conspiracy documents add to board
- [ ] All endings reachable
- [ ] No console errors

### Future Automated Testing

```typescript
// Example unit test structure:
describe('SaveLoadSystem', () => {
  it('should save game state to LocalStorage', () => {
    // Arrange: Set up game state
    // Act: Call saveGame()
    // Assert: Check LocalStorage contains data
  });
});
```

## Extending the Game

### Adding a New Minigame

1. Create new scene file: `src/minigames/MyMinigame.ts`
2. Extend `Phaser.Scene`
3. Implement init(), create(), and missionComplete()
4. Add scene to `main.ts` scene array
5. Reference in missions.ts with new minigameType
6. Update type in `missions.ts` interface

### Adding a New Era

1. Create `src/scenes/Era11Scene.ts`
2. Add era-specific visual style
3. Add missions for era to `missions.ts`
4. Update NPCs availability in `npcs.ts`
5. Add equipment for era in `equipment.ts`
6. Update basement era name mapping
7. Add to main.ts scene list

### Adding a New System

1. Create file in `src/systems/`
2. Export class or functions
3. Import in scenes that need it
4. Consider if state needs to be in gameStore
5. Document usage in this file

## File Naming Conventions

- **Scenes**: `PascalCase` + `Scene` suffix (e.g., `MainMenuScene.ts`)
- **Minigames**: `PascalCase` + `Minigame` suffix
- **Systems**: `PascalCase` + `System` suffix
- **Data**: `camelCase`, plural (e.g., `missions.ts`, `npcs.ts`)
- **Types**: `PascalCase` interfaces/types
- **Constants**: `UPPER_SNAKE_CASE`

## Dependencies

### Core
- **phaser**: Game engine
- **zustand**: State management
- **typescript**: Type safety
- **vite**: Build tool

### Dev
- **@types/**: TypeScript definitions
- **eslint**: Code linting
- **tailwindcss**: CSS utilities (minimal use)
- **postcss/autoprefixer**: CSS processing

## Build & Deploy

### Development
```bash
npm run dev    # Start dev server (localhost:3000)
```

### Production
```bash
npm run build  # Compile TS + bundle with Vite
npm run preview # Preview production build locally
```

### Output
- `dist/` folder contains all deployable files
- Static site, no server required
- Deploy to Vercel, Netlify, GitHub Pages, etc.

## Future Architecture Improvements

- [ ] Separate rendering from game logic
- [ ] Implement Entity-Component-System for game objects
- [ ] Add event bus for cross-scene communication
- [ ] Asset manager with lazy loading
- [ ] Localization system for multiple languages
- [ ] Mod loading system
- [ ] Performance profiler integration

---

**Document Version:** 1.0 (MVP)  
**Last Updated:** February 2026  
**Status:** Complete reference for MVP codebase
