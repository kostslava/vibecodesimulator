import { create } from 'zustand';

export interface Relationship {
  npcId: string;
  affection: number;      // -100 to 100
  respect: number;        // 0 to 100
  trust: number;          // 0 to 100
  lastInteraction: number;
  relationshipEvents: string[];
}

export interface ReputationSystem {
  hackerCred: number;
  corporateStanding: number;
  governmentTrust: number;
  communityRespect: number;
}

export interface SaveGame {
  version: string;
  timestamp: number;
  playerName: string;
  currentEra: number;
  currentScene: string;
  
  completedMissions: string[];
  availableMissions: string[];
  money: number;
  equipment: string[];
  
  relationships: Record<string, Relationship>;
  reputation: ReputationSystem;
  
  discoveredDocuments: string[];
  connections: Array<{ from: string; to: string }>;
  conspiracyCompletion: number;
  
  majorChoices: Record<string, string>;
  careerPath: 'corporate' | 'indie' | 'opensource' | 'startup' | 'government' | 'academic';
  
  projectsCompleted: number;
  minigamesWon: number;
  minigamesLost: number;
  totalPlaytime: number;
  tutorialCompleted: boolean;
}

interface GameState {
  // Player info
  playerName: string;
  currentEra: number;
  currentScene: string;
  
  // Progression
  completedMissions: string[];
  availableMissions: string[];
  money: number;
  equipment: string[];
  
  // Relationships
  relationships: Record<string, Relationship>;
  reputation: ReputationSystem;
  
  // Investigation
  discoveredDocuments: string[];
  connections: Array<{ from: string; to: string }>;
  conspiracyCompletion: number;
  
  // Choices
  majorChoices: Record<string, string>;
  careerPath: 'corporate' | 'indie' | 'opensource' | 'startup' | 'government' | 'academic';
  
  // Stats
  projectsCompleted: number;
  minigamesWon: number;
  minigamesLost: number;
  totalPlaytime: number;
  tutorialCompleted: boolean;
  
  // Actions
  setPlayerName: (name: string) => void;
  setCurrentEra: (era: number) => void;
  setCurrentScene: (scene: string) => void;
  addMoney: (amount: number) => void;
  spendMoney: (amount: number) => boolean;
  completeMission: (missionId: string) => void;
  addEquipment: (equipmentId: string) => void;
  updateRelationship: (npcId: string, changes: Partial<Relationship>) => void;
  updateReputation: (type: keyof ReputationSystem, amount: number) => void;
  discoverDocument: (documentId: string) => void;
  addConnection: (from: string, to: string) => void;
  recordChoice: (choiceId: string, choice: string) => void;
  setCareerPath: (path: 'corporate' | 'indie' | 'opensource' | 'startup' | 'government' | 'academic') => void;
  incrementStat: (stat: 'projectsCompleted' | 'minigamesWon' | 'minigamesLost') => void;
  setTutorialCompleted: () => void;
  resetGame: () => void;
  loadSave: (save: SaveGame) => void;
  getSaveData: () => SaveGame;
}

const initialState = {
  playerName: '',
  currentEra: 1,
  currentScene: 'MainMenu',
  completedMissions: [],
  availableMissions: [],
  money: 1000,
  equipment: ['basic_desk', 'folding_chair', 'single_bulb'],
  relationships: {},
  reputation: {
    hackerCred: 0,
    corporateStanding: 0,
    governmentTrust: 0,
    communityRespect: 0,
  },
  discoveredDocuments: [],
  connections: [],
  conspiracyCompletion: 0,
  majorChoices: {},
  careerPath: 'indie' as const,
  projectsCompleted: 0,
  minigamesWon: 0,
  minigamesLost: 0,
  totalPlaytime: 0,
  tutorialCompleted: false,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,
  
  setPlayerName: (name: string) => set({ playerName: name }),
  
  setCurrentEra: (era: number) => set({ currentEra: era }),
  
  setCurrentScene: (scene: string) => set({ currentScene: scene }),
  
  addMoney: (amount: number) => set((state) => ({ money: state.money + amount })),
  
  spendMoney: (amount: number) => {
    const state = get();
    if (state.money >= amount) {
      set({ money: state.money - amount });
      return true;
    }
    return false;
  },
  
  completeMission: (missionId: string) => set((state) => ({
    completedMissions: [...state.completedMissions, missionId],
    availableMissions: state.availableMissions.filter(id => id !== missionId),
  })),
  
  addEquipment: (equipmentId: string) => set((state) => ({
    equipment: [...state.equipment, equipmentId],
  })),
  
  updateRelationship: (npcId: string, changes: Partial<Relationship>) => set((state) => ({
    relationships: {
      ...state.relationships,
      [npcId]: {
        ...state.relationships[npcId],
        npcId,
        affection: state.relationships[npcId]?.affection ?? 0,
        respect: state.relationships[npcId]?.respect ?? 0,
        trust: state.relationships[npcId]?.trust ?? 0,
        lastInteraction: Date.now(),
        relationshipEvents: state.relationships[npcId]?.relationshipEvents ?? [],
        ...changes,
      },
    },
  })),
  
  updateReputation: (type: keyof ReputationSystem, amount: number) => set((state) => ({
    reputation: {
      ...state.reputation,
      [type]: Math.max(0, Math.min(100, state.reputation[type] + amount)),
    },
  })),
  
  discoverDocument: (documentId: string) => set((state) => {
    if (state.discoveredDocuments.includes(documentId)) return {};
    return { discoveredDocuments: [...state.discoveredDocuments, documentId] };
  }),
  
  addConnection: (from: string, to: string) => set((state) => {
    const exists = state.connections.some(c => c.from === from && c.to === to);
    if (exists) return {};
    return { connections: [...state.connections, { from, to }] };
  }),
  
  recordChoice: (choiceId: string, choice: string) => set((state) => ({
    majorChoices: { ...state.majorChoices, [choiceId]: choice },
  })),
  
  setCareerPath: (path) => set({ careerPath: path }),
  
  incrementStat: (stat) => set((state) => ({
    [stat]: state[stat] + 1,
  })),
  
  setTutorialCompleted: () => set({ tutorialCompleted: true }),
  
  resetGame: () => set(initialState),
  
  loadSave: (save: SaveGame) => set({
    playerName: save.playerName,
    currentEra: save.currentEra,
    currentScene: save.currentScene,
    completedMissions: save.completedMissions,
    availableMissions: save.availableMissions,
    money: save.money,
    equipment: save.equipment,
    relationships: save.relationships,
    reputation: save.reputation,
    discoveredDocuments: save.discoveredDocuments,
    connections: save.connections,
    conspiracyCompletion: save.conspiracyCompletion,
    majorChoices: save.majorChoices,
    careerPath: save.careerPath,
    projectsCompleted: save.projectsCompleted,
    minigamesWon: save.minigamesWon,
    minigamesLost: save.minigamesLost,
    totalPlaytime: save.totalPlaytime,
    tutorialCompleted: save.tutorialCompleted || false,
  }),
  
  getSaveData: (): SaveGame => {
    const state = get();
    return {
      version: '1.0.0',
      timestamp: Date.now(),
      playerName: state.playerName,
      currentEra: state.currentEra,
      currentScene: state.currentScene,
      completedMissions: state.completedMissions,
      availableMissions: state.availableMissions,
      money: state.money,
      equipment: state.equipment,
      relationships: state.relationships,
      reputation: state.reputation,
      discoveredDocuments: state.discoveredDocuments,
      connections: state.connections,
      conspiracyCompletion: state.conspiracyCompletion,
      majorChoices: state.majorChoices,
      careerPath: state.careerPath,
      projectsCompleted: state.projectsCompleted,
      minigamesWon: state.minigamesWon,
      minigamesLost: state.minigamesLost,
      totalPlaytime: state.totalPlaytime,
      tutorialCompleted: state.tutorialCompleted,
    };
  },
}));
