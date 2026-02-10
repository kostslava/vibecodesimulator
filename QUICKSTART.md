# Vibe Code Simulator - Quick Play Guide

## Getting Started

### 1. Installation
```bash
git clone https://github.com/kostslava/vibecodesimulator.git
cd vibecodesimulator
npm install
npm run dev
```

Open browser to: http://localhost:3000

### 2. Main Menu

When you start the game, you'll see:

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║            VIBE CODE SIMULATOR                             ║
║        80 Years of Programming History                     ║
║                                                            ║
║         > NEW GAME                                         ║
║           CONTINUE                                         ║
║           LOAD GAME                                        ║
║           CREDITS                                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**Controls:** Use mouse to click or arrow keys + ENTER

### 3. Creating Your Character

Select "NEW GAME" and enter your programmer name:
```
ENTER YOUR NAME:
> YourName_

Press ENTER to confirm
```

### 4. The Basement Hub

This is your home base throughout the game:

```
╔════════════════════════════════════════════════════════════╗
║  YOUR BASEMENT - 1945-1950 ENIAC ERA                       ║
║                                                            ║
║  Programmer: YourName             Money: $1000            ║
║  Reputation:                                              ║
║    Hacker: 0  Corporate: 0                                ║
║    Government: 0  Community: 0                            ║
║                                                            ║
║  [Your Workspace Visual]                                  ║
║                                                            ║
║  BASEMENT MENU:                                           ║
║  [P]roject Board      - Select missions                   ║
║  [E]quipment Shop     - Buy upgrades                      ║
║  [I]nvestigation Board - View conspiracy                  ║
║  [S]ave Game          - Save progress                     ║
║  [N]ext Era           - Advance time                      ║
║  [Q]uit to Menu       - Return to menu                    ║
╚════════════════════════════════════════════════════════════╝
```

**Keyboard Shortcuts:** Press P, E, I, S, N, or Q for quick access

### 5. Selecting a Mission

Press **P** for Project Board:

```
╔════════════════════════════════════════════════════════════╗
║                    PROJECT BOARD                           ║
║                                                            ║
║  [NEW] Artillery Trajectory Tables                        ║
║  Client: U.S. Army Ballistic Research Laboratory          ║
║  Reward: $500                                             ║
║  (Click to start mission)                                 ║
║                                                            ║
║  [NEW] Weather Prediction Calculations                    ║
║  Client: National Weather Service                         ║
║  Reward: $300                                             ║
║                                                            ║
║  Click anywhere to close                                  ║
╚════════════════════════════════════════════════════════════╝
```

**Click on a mission** to start the minigame challenge!

### 6. Minigame Example: Punch Card Sorting

```
╔════════════════════════════════════════════════════════════╗
║                 PUNCH CARD SORTING                         ║
║     Drag cards into correct numerical order                ║
║                                                            ║
║  Time: 60                        Accuracy: 0%             ║
║                                                            ║
║  [3] [1] [5] [2] [4] [8] [6] [7]  ← Unsorted cards       ║
║                                                            ║
║                                                            ║
║  [_] [_] [_] [_] [_] [_] [_] [_]  ← Target slots          ║
║   1   2   3   4   5   6   7   8                           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**How to play:**
1. Click and drag cards from top row
2. Drop them in correct numerical order (1-8) in bottom slots
3. Get 80%+ accuracy before time runs out

**On success:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              MISSION COMPLETE!                             ║
║                    +$500                                   ║
║                                                            ║
║           Press SPACE to continue                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### 7. Equipment Shop

Press **E** to upgrade your workspace:

```
╔════════════════════════════════════════════════════════════╗
║                  EQUIPMENT SHOP                            ║
║  Your Money: $500                                         ║
║                                                            ║
║  $500 Mechanical Keyboard                                 ║
║  Satisfying clicks for faster coding                      ║
║  (Click to purchase)                                      ║
║                                                            ║
║  $300 Single CRT Monitor                                  ║
║  Green phosphor glow, very aesthetic                      ║
║                                                            ║
║  [OWNED] Folding Chair                                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**Equipment bonuses:**
- Keyboards: Faster minigame completion
- Monitors: Fewer errors in minigames
- Chairs: More energy (more missions per day)
- Computers: Overall stat boosts

### 8. Investigation Board

Press **I** to track the conspiracy:

```
╔════════════════════════════════════════════════════════════╗
║              INVESTIGATION BOARD                           ║
║                                                            ║
║  Conspiracy Completion: 15%                               ║
║  Documents Discovered: 2                                  ║
║                                                            ║
║  • doc_military_computing                                 ║
║  • doc_data_collection                                    ║
║                                                            ║
║  Connect the dots to uncover the truth...                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**The conspiracy:**
Piece together documents across 80 years to discover:
- How computing started as military tech
- Surveillance infrastructure development
- Tech oligarchy formation
- The emergence of AI

### 9. Advancing Eras

Press **N** when ready to progress:
- Complete main missions to unlock new eras
- Each era (1945-2026) brings new challenges
- New equipment becomes available
- Meet new NPCs and make crucial choices
- Uncover more conspiracy documents

### 10. Multiple Endings

After Era 10 (2021-2026), your journey concludes with one of 8 endings based on:
- **Reputation scores** (Hacker, Corporate, Government, Community)
- **Conspiracy completion** percentage
- **Money** accumulated
- **Major choices** you made

**Example endings:**
- 🏛️ **The Oligarch** - Join the tech elite
- 🔓 **The Revolutionary** - Open source everything
- 📢 **The Whistleblower** - Expose the truth
- 🌿 **The Walk Away** - Find peace outside tech
- 🔁 **The Time Loop** (Secret) - Discover the full truth

## Tips for Success

### Money Management
- Complete missions to earn money
- Buy equipment strategically (start with stat-boosting items)
- Side missions provide extra income

### Reputation Building
- **Hacker Cred**: Choose open source, clever solutions
- **Corporate**: Meet deadlines, accept corporate missions
- **Government**: Take classified contracts
- **Community**: Share knowledge, help others

### Investigation
- Read mission briefings carefully for clues
- Documents are revealed after main missions
- High conspiracy completion unlocks special endings

### Minigame Mastery
- Equipment upgrades make minigames easier
- Practice each type to learn patterns
- Some minigames get harder in later eras

### Save Often
- Auto-save happens when entering basement
- Use manual save (press S) before big decisions
- 3 save slots available for different playthrough

## All Minigames Quick Reference

1. **Punch Card Sorting** - Drag cards into numerical order
2. **Wire Routing** - Connect matching numbered nodes without crossing
3. **Terminal Commands** - Type commands exactly as shown
4. **Bug Hunt** - Click on lines with coding errors
5. **Merge Conflict** - Choose correct code version
6. **Regex Golf** - Create patterns to match specific strings

## Keyboard Shortcuts

**Main Menu:**
- Arrow Keys: Navigate
- ENTER: Select

**Basement:**
- P: Project Board
- E: Equipment Shop
- I: Investigation Board
- S: Save Game
- N: Next Era
- Q: Quit to Menu

**Minigames:**
- Mouse: Primary interaction
- SPACE: Continue/Skip
- Type: Terminal minigame

## Troubleshooting

**Game won't start:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Save not loading:**
- Check browser LocalStorage not full
- Try different save slot
- Export save as backup (feature coming)

**Performance issues:**
- Close other browser tabs
- Reduce browser window size
- Clear browser cache

**Build for deployment:**
```bash
npm run build
# Output in dist/ folder
# Deploy to Vercel, Netlify, GitHub Pages
```

## Development Mode

**Useful commands:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint (if configured)
```

**Debugging:**
- Open browser DevTools (F12)
- Check Console for errors
- Use browser's LocalStorage inspector
- Zustand state viewable in console

## Need Help?

- Check README.md for detailed info
- Read DESIGN.md for game mechanics
- See CODE_STRUCTURE.md for code organization
- Open GitHub issue for bugs
- Pull requests welcome!

---

**Have fun exploring 80 years of programming history!**

*Remember: Your choices matter. The conspiracy is real. The AI is watching.* 🖥️
