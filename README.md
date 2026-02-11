# Vibe Code Simulator

**80 Years of Programming History - A Narrative Web Game**

<p align="center">
  <strong>Experience the evolution of computing from ENIAC to AI, make choices that matter, and uncover the conspiracy that connects it all.</strong>
</p>

## 🎮 About The Game

Vibe Code Simulator is a narrative-driven web game that takes you through 80 years of programming history (1945-2026). Play as a programmer whose career spans the entire history of computing, from punch cards to artificial intelligence, while uncovering a decades-spanning conspiracy about technology, power, and control.

### Key Features

- **10 Playable Eras**: Experience computing evolution across 80 years
- **6 Coding Minigames**: Puzzle-based challenges themed to each era
- **Rich Narrative**: Branching dialog, memorable NPCs, meaningful choices
- **Conspiracy Investigation**: Piece together documents and connections
- **8 Different Endings**: Your choices determine your fate
- **Progression Systems**: Equipment upgrades, reputation tracking, relationship building
- **Persistent Save System**: LocalStorage-based saves with auto-save

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kostslava/vibecodesimulator.git
cd vibecodesimulator

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build

# Preview production build
npm run preview
```

### Deployment

The game builds to static files and can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag `dist` folder to Netlify
- **GitHub Pages**: Copy `dist` contents to `gh-pages` branch

## 🎯 How to Play

### Main Menu
- **New Game**: Start fresh adventure (enter your programmer name)
- **Continue**: Load auto-save
- **Load Game**: Choose from 3 save slots
- **Credits**: View game information

### Basement Hub
Your persistent workspace where you:
- Select missions from the **Project Board**
- Upgrade equipment in the **Equipment Shop**
- Investigate conspiracy on the **Investigation Board**
- Save your progress
- Advance to next era

### Missions & Minigames

Complete coding challenges to earn money and advance the story:

1. **Punch Card Sorting** (1945-1960): Drag cards into correct order
2. **Wire Routing** (1945-1970): Connect matching numbered nodes
3. **Terminal Commands** (1970-2000): Type commands exactly as shown
4. **Bug Hunt** (1980-2026): Find bugs in code snippets
5. **Merge Conflict** (1990-2026): Resolve conflicting code versions
6. **Regex Golf** (2000-2026): Pattern matching challenges

### Progression

- **Money**: Earned from missions, spent on equipment upgrades
- **Reputation**: 4 tracks (Hacker, Corporate, Government, Community)
- **Equipment**: Upgrades improve minigame performance
- **Conspiracy Completion**: Unlock special endings

## 📖 Game Lore

### The 10 Eras

1. **1945-1950 - ENIAC Era**: Vacuum tubes and military contracts
2. **1951-1960 - Mainframe Era**: Corporate computing emerges
3. **1961-1970 - Cold War Computing**: DARPA and the space race
4. **1971-1980 - Microprocessor Dawn**: Personal computing begins
5. **1981-1990 - PC Revolution**: IBM PC and BBS culture
6. **1991-2000 - Internet Explosion**: Web 1.0 and dot-com boom
7. **2001-2010 - Surveillance Expansion**: Post-9/11 tech world
8. **2011-2015 - Mobile & Big Data**: Smartphones everywhere
9. **2016-2020 - AI Boom**: Machine learning revolution
10. **2021-2026 - Technocratic Endgame**: Choose your ending

### Key NPCs

- **Betty Johnson**: ENIAC programmer turned CS professor (your mentor)
- **The Rival**: Your alternate-universe competitor (with a twist)
- **Max Thiel**: Venture capitalist oligarch (Peter Thiel analog)
- **Alex Riviera**: Open source advocate and privacy activist
- **Dr. Sarah Chen**: AI researcher questioning her work
- **The Intern**: Mysterious presence across eras (the big reveal)

### The Conspiracy

Piece together documents to discover:
- Military origins of computing
- Surveillance infrastructure development  
- PayPal Mafia connections
- Tech oligopoly formation
- The emergent AI system

## 🏆 Endings

Your choices determine which ending you reach:

1. **The Good Citizen**: Ignorance is bliss
2. **The Oligarch**: Join the elite
3. **The Whistleblower**: Expose the truth
4. **The Revolutionary**: Open source everything
5. **Complete the Network**: Help the AI
6. **Pull the Plug**: Sabotage the system
7. **The Walk Away**: Find peace outside tech
8. **The Time Loop** (Secret): Discover the full truth

## 🛠️ Technical Stack

- **Game Engine**: Phaser 3
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS (UI overlays)
- **Audio**: Howler.js (placeholders for MVP)
- **Storage**: LocalStorage (save system)

## 📂 Project Structure

```
vibe-code-simulator/
├── src/
│   ├── scenes/         # Phaser scenes (Boot, Menu, Basement, Eras, Ending)
│   ├── minigames/      # 6 coding minigames
│   ├── systems/        # Dialog, SaveLoad, etc.
│   ├── data/           # Missions, NPCs, Equipment, Conspiracy
│   ├── store/          # Zustand game state
│   ├── main.ts         # Entry point
│   └── utils/          # Helper functions
├── public/
│   └── assets/         # Sprites, audio, fonts (placeholders)
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Art & Assets

The MVP uses:
- Geometric shapes and rectangles (colored fills)
- Monospace fonts (Press Start 2P, system monospace)
- Simple color palettes per era
- Terminal-style UI aesthetics

**Note**: Placeholder assets are intentionally minimal. Replace with:
- Custom pixel art sprites
- Era-appropriate music tracks
- Sound effects for interactions
- Custom fonts for each decade

## 💾 Save System

- **Auto-save**: Triggered when entering basement
- **Manual save**: 3 save slots available
- **Save location**: Browser LocalStorage
- **Save includes**: All progress, choices, inventory, relationships
- **Export/Import**: JSON format (future feature)

## 🎮 Controls

- **Mouse**: Click to interact with buttons, minigames
- **Keyboard**: 
  - Arrow keys: Navigate menus
  - ENTER: Confirm selections
  - SPACE: Continue/Skip
  - Letter keys: Shortcut actions (P, E, I, S, N, Q in Basement)
  - Type: Terminal minigame input

## 🐛 Known Limitations (MVP)

- Era scenes are placeholders (no detailed environments yet)
- Limited minigame variety per era
- No actual audio/music (Howler.js configured but not used)
- Conspiracy board is text-based (no visual node graph yet)
- Romance subplots are dialog-only
- Random events are simplified
- Some minigames auto-complete (Regex Golf)

## 🚧 Future Enhancements

- [ ] Full pixel art for all eras
- [ ] Animated character sprites
- [ ] Era-appropriate music soundtracks
- [ ] Visual conspiracy investigation board
- [ ] More complex minigames
- [ ] Actual random event system
- [ ] Achievement system
- [ ] New Game+ mode
- [ ] Multiple language support

## 🤝 Contributing

Contributions are welcome! Areas that need help:

- **Art**: Pixel art for eras, characters, equipment
- **Audio**: Chiptune/era-appropriate music
- **Writing**: Additional dialog, mission descriptions
- **Testing**: Bug reports, balance feedback
- **Code**: Minigame improvements, new features

## 📜 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Phaser community for excellent game framework
- The real pioneers of computing who inspired this game
- Everyone who contributed to open source tools used here

## 📧 Contact

For questions, suggestions, or collaboration:
- Create an issue on GitHub
- Pull requests welcome

---

**Made with ❤️ and lots of coffee**

*"We shape our tools, and thereafter our tools shape us." - Marshall McLuhan*

