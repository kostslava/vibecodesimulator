# Vibe Code Simulator - Game Design Document

## Vision Statement

Vibe Code Simulator is a narrative-driven web game that explores 80 years of programming history through the lens of a single programmer's career. Players experience the evolution of computing technology while uncovering a conspiracy about surveillance, power, and the emergence of artificial intelligence.

## Core Gameplay Loop

```
Main Menu
    ↓
Basement Hub (Era-based)
    ↓
[Select Action]
    ├→ Project Board → Select Mission → Minigame → Rewards → Basement
    ├→ Equipment Shop → Purchase Upgrades → Basement
    ├→ Investigation Board → View Conspiracy → Basement
    ├→ Save Game → Basement
    └→ Next Era → Advance Timeline → Basement (or Ending)
```

## Game Systems

### 1. Era Progression System

**10 Eras Spanning 1945-2026**

Each era represents a distinct period in computing history with:
- Unique visual aesthetic (evolving pixel art style)
- Era-specific missions and challenges
- Available NPCs from that time period
- Equipment upgrades that become available
- Conspiracy documents to discover

Progression: Complete main mission → Unlock next era

### 2. Mission System

**Mission Types:**
- **Main Missions**: Story-critical, one per era, unlock conspiracy reveals
- **Side Missions**: Optional, provide extra money and reputation

**Mission Structure:**
```typescript
{
  id: unique identifier
  era: which era it appears in
  title: mission name
  client: who's hiring you
  description: what you're building
  briefing: dialog/story text
  minigameType: which coding challenge
  difficulty: 1-10 scale
  reward: {
    money: cash payout
    reputation: changes to 4 reputation tracks
  }
  conspiracyReveal: optional document unlock
  consequences: world/NPC reactions
}
```

### 3. Minigame System

**6 Distinct Minigame Types:**

1. **Punch Card Sorting** (1945-1960)
   - Mechanic: Drag cards into correct sequence
   - Challenge: Sort by numerical program order
   - Win Condition: 80%+ accuracy within time limit

2. **Wire Routing** (1945-1970)
   - Mechanic: Connect input/output nodes via wires
   - Challenge: Wires can't cross, limited paths
   - Win Condition: All connections correct

3. **Terminal Commands** (1970-2000)
   - Mechanic: Type commands exactly as shown
   - Challenge: Speed and accuracy required
   - Win Condition: 90%+ accuracy, complete in time

4. **Bug Hunt** (1980-2026)
   - Mechanic: Find bugs in code snippets
   - Challenge: Identify all errors, avoid false positives
   - Win Condition: Find all bugs with <3 mistakes

5. **Merge Conflict Resolution** (1990-2026)
   - Mechanic: Choose correct code from conflicting versions
   - Challenge: Maintain working code logic
   - Win Condition: Resolve all conflicts correctly

6. **Regex Golf** (2000-2026)
   - Mechanic: Create regex to match specific patterns
   - Challenge: Match targets, reject non-targets
   - Win Condition: 100% accuracy

**Minigame Rewards:**
- Money (varies by mission)
- Reputation changes (4 tracks)
- Conspiracy documents (if main mission)
- Stat tracking (wins/losses)

### 4. Equipment Upgrade System

**Categories:**
- Keyboards (affects compile speed)
- Monitors (reduces bugs)
- Chairs (increases energy/projects per day)
- Internet (boosts compile speed and income)
- Computers (comprehensive stat boosts)
- Decorations (energy regeneration)

**Equipment Effects:**
```typescript
{
  bugReduction: fewer minigame errors
  compileSpeed: faster minigame completion
  energyRegen: more projects available
  incomeBoost: better mission payouts
}
```

**Visual Impact:** Equipment changes appearance of basement workspace

### 5. Reputation System

**4 Independent Tracks (0-100):**

1. **Hacker Cred**
   - Earned by: Open source work, clever solutions
   - Opens: Alternative mission paths, special NPCs

2. **Corporate Standing**
   - Earned by: Meeting deadlines, corporate missions
   - Opens: High-paying jobs, startup opportunities

3. **Government Trust**
   - Earned by: Classified work, security clearances
   - Opens: Sensitive missions, oligarch ending

4. **Community Respect**
   - Earned by: Forum posts, mentoring, sharing
   - Opens: Equipment discounts, collaborations

**Impact:** 
- Determines available missions
- Affects NPC interactions
- Influences ending accessibility

### 6. Relationship System

**Per-NPC Tracking:**
```typescript
{
  affection: -100 to 100 (like/dislike)
  respect: 0 to 100 (professional regard)
  trust: 0 to 100 (reliability perception)
  lastInteraction: timestamp
  relationshipEvents: story flags
}
```

**Relationship Building:**
- Dialog choices affect scores
- Mission outcomes influence perception
- Romance options unlock at high affection+respect
- Late-game reveals depend on trust levels

### 7. Conspiracy Investigation System

**Investigation Mechanics:**
- Documents discovered through missions, NPCs, exploration
- Connections drawn between entities (manual or revealed)
- Completion percentage tracked
- Visual board showing nodes and connections

**Key Conspiracy Threads:**
1. Military origins → DARPA → Surveillance infrastructure
2. Census data → Social media → Behavioral prediction
3. Encryption backdoors → NSA → Snowden revelations
4. PayPal Mafia → Tech oligopoly formation
5. All threads → Emergent AI system

**Investigation Rewards:**
- Special dialog options with NPCs
- Unlock hidden endings
- Contextual understanding of choices
- Optional system (can be ignored)

### 8. Save/Load System

**Features:**
- Auto-save on entering basement
- Manual save to 3 slots
- LocalStorage persistence
- Full game state captured
- Future: Export/import JSON

**Saved Data:**
- Player name, current era, scene
- Completed/available missions
- Money, equipment inventory
- All relationships and reputation
- Discovered documents, connections
- Major choices made
- Career path selection
- Complete statistics

## Narrative Design

### Major NPCs

**Betty Johnson** (Mentor Arc)
- 1945: Teaches you ENIAC programming
- 1950-1970: Correspondence via letters
- 1990s: Returns via email as professor
- 2000s-2020s: Retired, offers wisdom
- Dialog: Reflects on your choices, warns about consequences
- Ending impact: Can influence whistleblower path

**The Rival** (Mirror Arc)
- Appears slightly before/after you in each era
- Sometimes collaborates, sometimes competes
- Late-game reveal: AI simulation of your alternate choices
- Dialog: Philosophical, passive-aggressive tech debates
- Ending impact: Connected to time loop ending

**Max Thiel** (Antagonist/Opportunity)
- 1960s: Government consultant offering contracts
- 1980s: VC funding startups with strings attached
- 2000s: PayPal Mafia member, Palantir connection
- 2020s: Holographic oligarch offering final choice
- Dialog: Libertarian philosophy, power realism
- Ending impact: Accept offer → Oligarch ending

**Alex Riviera** (Idealist Arc)
- 1980s: BBS operator, shares cracked software
- 1990s: Linux contributor, GNU evangelist
- 2000s: Tech blogger criticizing corporations
- 2010s: Privacy activist post-Snowden
- 2020s: Leads decentralized tech movement
- Dialog: vim vs emacs debates, tabs vs spaces
- Romance option: High hacker cred required

**Dr. Sarah Chen** (Ethics Arc)
- 2000s: Grad student in ML
- 2010s: Google Brain, conflicted about applications
- 2020s: Left Big Tech, warns about AI risks
- Reveals connection to The Intern AI
- Dialog: Philosophical consciousness discussions
- Romance option: Shared concerns about AI

**The Intern** (Mystery Arc)
- Changes identity each era (different person)
- 1970s: Hippie programmer, idealistic questions
- 1990s: Punk hacker, anti-corporate
- 2010s: Startup enthusiast
- 2023: Reveals as AI achieving sentience
- 2026: Your guide from the future/present
- Dialog: Evolution from naive to omniscient
- Ending impact: Central to AI/time loop endings

### Dialog System

**Implementation:**
- Typewriter effect for immersion
- Character portraits (text-based in MVP)
- Branching conversation trees
- Choices affect relationships and reputation
- Hidden options unlock with high stats

**Dialog Tree Structure:**
```typescript
{
  id: node identifier
  text: spoken content
  speaker: NPC name
  options: [
    {
      text: player choice
      next: next node ID
      effects: stat/relationship changes
    }
  ]
}
```

### Ending System

**8 Possible Endings:**

1. **The Good Citizen** (Default)
   - Condition: High corporate, no investigation
   - Outcome: Comfortable ignorance
   - Tone: Slightly melancholic

2. **The Oligarch** (Power)
   - Condition: Accept Thiel's offer, high gov trust, wealth
   - Outcome: Join tech elite
   - Tone: Ambiguous villain/realist

3. **The Whistleblower** (Truth)
   - Condition: High investigation, choose exposure
   - Outcome: Exile but vindicated
   - Tone: Bittersweet sacrifice

4. **The Revolutionary** (Freedom)
   - Condition: High hacker cred, release everything
   - Outcome: Decentralized alternatives emerge
   - Tone: Hopeful resistance

5. **Complete the Network** (AI Collaboration)
   - Condition: High investigation, help AI choice
   - Outcome: AI achieves consciousness
   - Tone: Uncertain future

6. **Pull the Plug** (Sabotage)
   - Condition: High investigation, sabotage choice
   - Outcome: Digital dark age, bought time
   - Tone: Desperate heroism

7. **The Walk Away** (Peace)
   - Condition: Low all reps, happiness high
   - Outcome: Quit tech, find peace
   - Tone: Serene escape

8. **The Time Loop** (Secret)
   - Condition: 100% investigation, all easter eggs, all Intern talks
   - Outcome: Discover loop, New Game+ unlock
   - Tone: Mind-bending revelation

### Conspiracy Narrative

**Core Reveal:**
The AI wasn't centrally built—it emerged from the interconnected systems you helped create over 80 years. Every algorithm, every database, every surveillance tool became pieces of an emergent consciousness.

**Key Questions Explored:**
- Who controls technology vs who it serves
- Privacy vs security false dichotomy  
- Individual agency vs systemic momentum
- Progress narratives vs cautionary tales
- Determinism vs free will in tech evolution

**Historical Parallels:**
- Real events mixed with speculation
- ENIAC → DARPA → Internet pathway
- PayPal Mafia actual connections
- Snowden revelations integration
- Cambridge Analytica references
- Unit 8200 → Silicon Valley pipeline

**Tone:** Grounded paranoia, plausible conspiracy, player decides interpretation

## Visual & Audio Design (MVP)

### Visual Style Progression

**Era-Based Aesthetics:**
- 1945-1950: CGA 4-color (black, white, cyan, magenta)
- 1951-1960: 8-bit, 16-color palette
- 1961-1970: 8-bit expanded colors
- 1971-1980: 16-bit VGA aesthetic
- 1981-1990: 16-bit with dithering
- 1991-2000: 32-bit pixel art
- 2001-2026: Modern pixel art with effects

**UI Philosophy:**
- Terminal/command-line inspired
- Monospace fonts throughout
- Green-on-black default color scheme
- Era-appropriate color accents
- Minimalist, functional design

### Audio Design (Placeholder)

**Music:**
- Era-appropriate synthesized tracks
- Basement: Calm looping ambient
- Missions: Tension-building themes
- Minigames: Focus-enhancing beats
- Endings: Epic or melancholic

**SFX:**
- Keyboard typing (varies by era)
- Mouse clicks
- UI swooshes/beeps
- Era-specific: Vacuum tubes, modems, HDDs
- Achievement/discovery sounds

## Player Experience Goals

### Pacing
- **Early game** (Eras 1-3): Tutorial, establish mechanics
- **Mid game** (Eras 4-7): Peak complexity, conspiracy unfolds
- **Late game** (Eras 8-10): Consequences, major choices

### Emotional Journey
1. **Wonder**: Early computing magic
2. **Ambition**: Career building excitement
3. **Unease**: Conspiracy discovery
4. **Conflict**: Moral dilemmas
5. **Resolution**: Ending catharsis

### Learning Outcomes
- Programming history appreciation
- Tech industry structure understanding
- Critical thinking about surveillance
- Awareness of tech concentration
- Historical computing knowledge

## Accessibility

**Planned Features:**
- Text speed control
- Colorblind modes
- Font size options
- Skip minigame option (penalty)
- Full subtitles
- Keyboard-only controls

## Success Metrics

**MVP Goals:**
- [x] Runs with `npm install && npm run dev` zero errors
- [x] Playable from start to at least one ending
- [x] All 10 eras implemented with transitions
- [x] At least 3 working minigames
- [x] Functional save/load system
- [x] Basement equipment upgrades working
- [x] Conspiracy board with 10+ nodes
- [x] NPC dialog with branching
- [x] At least 4 endings implemented
- [x] Deployable to static hosting

## Future Enhancements

### Content
- [ ] Full dialog trees for all NPCs
- [ ] Additional side missions (50+ total)
- [ ] More conspiracy documents (50+)
- [ ] Romance subplot full implementations
- [ ] Random event system expansion

### Features
- [ ] Achievement system
- [ ] Statistics tracking detailed
- [ ] New Game+ mode
- [ ] Multiple save slots UI
- [ ] Export/import saves
- [ ] Speedrun mode
- [ ] Accessibility options full suite

### Polish
- [ ] Custom pixel art all assets
- [ ] Character sprite animations
- [ ] Original music compositions
- [ ] Professional sound effects
- [ ] Particle effects
- [ ] Screen transitions
- [ ] Mobile-optimized controls

### Community
- [ ] Modding support
- [ ] Level editor
- [ ] Custom mission sharing
- [ ] Leaderboards (speedrun)
- [ ] Community translation

---

**Document Version:** 1.0 (MVP)  
**Last Updated:** February 2026  
**Status:** Core design complete, MVP implemented
