# Asset Requirements for Vibe Code Simulator

## Overview
This document lists asset placeholders for enhancing the visual experience. The game currently uses procedurally generated graphics (Phaser shapes, rectangles, circles, text) which work well but can be replaced with custom pixel art or 3D models.

## Current State
- ✅ All visuals are functional using geometric shapes
- ✅ Game is fully playable without external assets
- ✅ Color-coded visual progression across eras
- ⚠️ Assets below are OPTIONAL enhancements

## Asset Categories

### 1. Computer Hardware Models (Per Era)

#### Era 1 (1945-1950): ENIAC Era
- **File**: `/public/assets/hardware/computer_era1.png`
- **Description**: ENIAC-style terminal or punch card machine
- **Dimensions**: 100x70px (or scalable SVG)
- **Style**: Pixel art, beige/brown tones, bulky industrial look
- **Reference**: ENIAC computer panels with vacuum tubes visible

#### Era 2 (1951-1960): Mainframe Era
- **File**: `/public/assets/hardware/computer_era2.png`
- **Description**: Mainframe terminal with monochrome CRT
- **Dimensions**: 120x80px
- **Style**: Metal gray, green phosphor screen glow
- **Reference**: IBM 1401 mainframe terminal

#### Era 3-4 (1961-1980): Cold War / Microprocessor
- **File**: `/public/assets/hardware/computer_era3.png`, `computer_era4.png`
- **Description**: Early minicomputer, then beige box PC
- **Dimensions**: 100x90px each
- **Style**: Transitioning from industrial to consumer electronics
- **Reference**: PDP-11, early Apple II or Altair 8800

#### Era 5 (1981-1990): PC Revolution
- **File**: `/public/assets/hardware/computer_era5.png`
- **Description**: CRT monitor + separate computer case
- **Dimensions**: 100x100px
- **Style**: Beige/cream plastic, bulky CRT
- **Reference**: IBM PC, Commodore 64, early Macintosh

#### Era 6-7 (1991-2010): Internet / Surveillance
- **Files**: `/public/assets/hardware/monitor_flat.png`, `tower_pc.png`, `webcam.png`
- **Description**: Flat LCD monitors, tower PC, webcam
- **Dimensions**: Varies by component
- **Style**: Black/silver plastic, LCD blue glow
- **Reference**: Dell monitors circa 2000s, ATX tower cases

#### Era 8-10 (2011-2026): Mobile / AI / Futuristic
- **Files**: `/public/assets/hardware/ultrawide_monitor.png`, `smartphone.png`, `tablet.png`, `holo_display.png`
- **Description**: Modern setup, mobile devices, holographic elements
- **Dimensions**: Varies, holographic can be animated sprite sheet
- **Style**: Sleek, dark, RGB accents, transparent holographic effect
- **Reference**: Modern gaming setups, sci-fi UI concepts

### 2. Furniture & Environment

#### Desks
- **Files**: `/public/assets/furniture/desk_wood.png` (Era 1-2)
- **Files**: `/public/assets/furniture/desk_metal.png` (Era 3-4)
- **Files**: `/public/assets/furniture/desk_modern.png` (Era 5-7)
- **Files**: `/public/assets/furniture/desk_standing.png` (Era 8-10)
- **Dimensions**: 250-320px wide, 30-40px tall
- **Style**: Top-down or slight angle view

#### Chairs
- **Files**: `/public/assets/furniture/chair_folding.png` (Era 1)
- **Files**: `/public/assets/furniture/chair_office.png` (Era 2-5)
- **Files**: `/public/assets/furniture/chair_ergonomic.png` (Era 6-7)
- **Files**: `/public/assets/furniture/chair_gaming.png` (Era 8-10)
- **Dimensions**: 60-80px wide, 80-100px tall
- **Style**: Side or 3/4 view

#### Wall Decorations
- **Files**: `/public/assets/decorations/poster_[theme].png`
- **Themes**: computing_future, retro_games, cyberpunk, ai_ethics, privacy, etc.
- **Dimensions**: 60x80px or 80x100px
- **Style**: Pixel art posters with era-appropriate designs

### 3. UI Elements

#### Notification Icons
- **File**: `/public/assets/ui/icons_spritesheet.png`
- **Description**: Sprite sheet with icons for: info, success, warning, conspiracy, equipment, achievement
- **Dimensions**: 32x32px per icon, 6 icons in row = 192x32px total
- **Style**: Pixel art, glowing effect, transparent background
- **Colors**: Match notification types (blue, green, orange, magenta, yellow, gold)

#### Particle Effects
- **File**: `/public/assets/particles/spark.png`
- **Description**: Small bright particle for burst effects
- **Dimensions**: 4x4px
- **Style**: Solid white/colored square or small star

#### HUD Elements
- **Files**: `/public/assets/ui/panel_bg.png`, `button_normal.png`, `button_hover.png`
- **Description**: 9-slice panels and buttons
- **Dimensions**: Tileable 9-slice (e.g., 48x48px with 16px borders)
- **Style**: Terminal/cyberpunk aesthetic with scan lines

### 4. Character Sprites (Optional)

#### Player Avatar
- **File**: `/public/assets/characters/player_idle.png`
- **Description**: Small programmer character sprite
- **Dimensions**: 32x32px or 64x64px
- **Style**: Pixel art, simple design, can have era-appropriate clothing variants
- **Animation**: Idle animation (2-4 frames) could show typing at keyboard

#### NPC Portraits
- **Files**: `/public/assets/characters/npc_[name].png`
- **Names**: betty, rival, vcryptid, intern, alex, sarah
- **Dimensions**: 64x64px portrait or 128x128px for dialog
- **Style**: Pixel art portraits showing personality (mentor, competitive, corporate, idealistic, etc.)

### 5. Effects & Animations

#### Glitch Effect Overlay
- **File**: `/public/assets/effects/glitch_overlay.png`
- **Description**: Transparent overlay with scan line distortion
- **Dimensions**: Full screen tileable (e.g., 800x600px)
- **Style**: Subtle RGB chromatic aberration effect

#### Screen Effects
- **Files**: `/public/assets/effects/scanlines.png`, `vignette.png`, `crt_curvature.png`
- **Description**: Overlay effects for retro CRT look
- **Dimensions**: Full screen or tileable
- **Style**: Low opacity (10-30%), subtle

### 6. Background Elements

#### Starfield
- **File**: `/public/assets/backgrounds/stars.png`
- **Description**: Procedural generation works well, but static starfield could be optimized
- **Dimensions**: 1920x1080px, scrollable
- **Style**: Black with white dots of varying sizes and opacity

#### Terminal Background
- **File**: `/public/assets/backgrounds/terminal_text.png`
- **Description**: Scrolling text effect for main menu
- **Dimensions**: 800x600px tileable
- **Style**: Green text on black, slightly blurred, scrolling effect

## Implementation Notes

### How to Add Assets

1. **Place files** in the specified `/public/assets/` directories
2. **Update asset loading** in `src/scenes/BootScene.ts`:
```typescript
this.load.image('computer_era1', 'assets/hardware/computer_era1.png');
this.load.image('desk_wood', 'assets/furniture/desk_wood.png');
// etc.
```

3. **Replace shapes in WorkspaceVisualizer**:
```typescript
// Instead of:
const pc = this.scene.add.rectangle(x, y, 100, 90, 0xddddc0);

// Use:
const pc = this.scene.add.image(x, y, 'computer_era4');
```

4. **Update NotificationSystem** for custom icons:
```typescript
// Instead of emoji strings, use sprite frames
const icon = this.scene.add.sprite(x, y, 'icons_spritesheet', iconFrame);
```

### Optimization

- Use sprite atlases for multiple related images
- Keep pixel art at native resolution, let Phaser scale
- Use WebP format for smaller file sizes (fallback to PNG)
- Compress PNGs with tools like TinyPNG

## Priority Levels

### High Priority (Most Visual Impact)
1. ✅ Computer hardware models (Eras 1, 5, 10) - Currently using shapes, works well
2. ✅ Notification icons - Currently using emoji, works well
3. ✅ Desk evolution - Currently using rectangles, works well

### Medium Priority (Nice to Have)
4. Furniture sprites (chairs especially)
5. Wall posters/decorations
6. Character portraits for NPCs

### Low Priority (Polish)
7. Particle effect sprites
8. Custom UI panels
9. Background images
10. Player avatar sprite

## Current Asset Usage

**None required!** The game is fully functional using:
- Phaser geometric shapes (rectangles, circles, lines)
- Text rendering
- Programmatic graphics
- Color gradients and effects
- Tweens and animations

All listed assets are OPTIONAL enhancements that can be added progressively without breaking existing functionality.

## 3D Model Integration (Optional)

For Three.js integration of 3D computer hardware:

### Setup
1. Add Three.js to dependencies: `npm install three`
2. Create `/src/components/Three3DWorkspace.ts`
3. Load GLTF models in `/public/assets/models/`

### Model Requirements
- **Format**: GLTF 2.0 (.glb preferred for binary)
- **Poly count**: < 5000 triangles per model (performance)
- **Textures**: 512x512px max, PBR materials
- **Models needed**:
  - `eniac_terminal.glb` - 1945 era
  - `mainframe_console.glb` - 1960s
  - `pc_crt.glb` - 1980s
  - `modern_setup.glb` - 2000s+
  - `futuristic_holo.glb` - 2020s

### Example Implementation
```typescript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// In WorkspaceVisualizer
private load3DModel(modelPath: string, x: number, y: number): void {
  const loader = new GLTFLoader();
  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    model.position.set(x, y, 0);
    model.scale.set(0.5, 0.5, 0.5);
    this.threeScene.add(model);
  });
}
```

## Asset Creation Tools

### Recommended Software
- **Pixel Art**: Aseprite, Pixaki, Lospec
- **3D Models**: Blender (free), MagicaVoxel (voxel art)
- **Sprites**: Photoshop, GIMP, Krita
- **Compression**: TinyPNG, ImageOptim

### Style Guide
- **Color Palette**: Limited per era (CGA for early, modern RGB for late)
- **Resolution**: Native pixel art, no anti-aliasing on sprites
- **Consistency**: Maintain same perspective across assets (top-down or 3/4 view)
- **Animation**: 2-4 frames max for idle animations

## Contact for Asset Contribution

If providing custom assets, please ensure:
- [ ] Correct dimensions
- [ ] Transparent background (PNG)
- [ ] Era-appropriate styling
- [ ] Optimized file size
- [ ] Rights to use/distribute

---

**Note**: The game is fully playable without any of these assets. They are purely optional visual enhancements!
