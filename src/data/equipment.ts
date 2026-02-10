export interface Equipment {
  id: string;
  name: string;
  era: number;
  cost: number;
  effects: {
    bugReduction?: number;
    compileSpeed?: number;
    energyRegen?: number;
    incomeBoost?: number;
  };
  visual: string;
  description: string;
}

export const equipment: Equipment[] = [
  // Keyboards
  {
    id: 'mechanical_switches',
    name: 'Mechanical Keyboard',
    era: 4,
    cost: 500,
    effects: { compileSpeed: 10 },
    visual: 'keyboard_mechanical',
    description: 'Satisfying clicks for faster coding',
  },
  {
    id: 'model_m',
    name: 'IBM Model M',
    era: 5,
    cost: 800,
    effects: { compileSpeed: 15, bugReduction: 5 },
    visual: 'keyboard_model_m',
    description: 'The legendary keyboard that will outlive you',
  },
  {
    id: 'ergonomic_split',
    name: 'Ergonomic Split Keyboard',
    era: 7,
    cost: 1200,
    effects: { compileSpeed: 20, energyRegen: 5 },
    visual: 'keyboard_ergo',
    description: 'Save your wrists for decades of coding',
  },
  {
    id: 'mechanical_rgb',
    name: 'RGB Mechanical Keyboard',
    era: 9,
    cost: 2000,
    effects: { compileSpeed: 25, bugReduction: 10 },
    visual: 'keyboard_rgb',
    description: 'More RGB = more FPS... wait, wrong application',
  },
  
  // Monitors
  {
    id: 'single_crt',
    name: 'Single CRT Monitor',
    era: 3,
    cost: 300,
    effects: { bugReduction: 5 },
    visual: 'monitor_crt',
    description: 'Green phosphor glow, very aesthetic',
  },
  {
    id: 'dual_crt',
    name: 'Dual CRT Setup',
    era: 5,
    cost: 800,
    effects: { bugReduction: 10, compileSpeed: 5 },
    visual: 'monitor_dual_crt',
    description: 'Twice the screen space, twice the radiation',
  },
  {
    id: 'lcd_panels',
    name: 'LCD Panels',
    era: 7,
    cost: 1500,
    effects: { bugReduction: 15, energyRegen: 10 },
    visual: 'monitor_lcd',
    description: 'Flat panels, less eye strain',
  },
  {
    id: 'triple_4k',
    name: 'Triple 4K Setup',
    era: 9,
    cost: 3000,
    effects: { bugReduction: 25, compileSpeed: 10 },
    visual: 'monitor_triple_4k',
    description: 'See every pixel of your mistakes',
  },
  
  // Chairs
  {
    id: 'folding_chair',
    name: 'Folding Chair',
    era: 1,
    cost: 50,
    effects: {},
    visual: 'chair_folding',
    description: 'It\'s a chair. Technically.',
  },
  {
    id: 'office_chair',
    name: 'Office Chair',
    era: 3,
    cost: 200,
    effects: { energyRegen: 5 },
    visual: 'chair_office',
    description: 'With wheels! And padding!',
  },
  {
    id: 'ergonomic_chair',
    name: 'Ergonomic Chair',
    era: 6,
    cost: 800,
    effects: { energyRegen: 15 },
    visual: 'chair_ergo',
    description: 'Lumbar support changes lives',
  },
  {
    id: 'herman_miller',
    name: 'Herman Miller Aeron',
    era: 8,
    cost: 1500,
    effects: { energyRegen: 25, incomeBoost: 5 },
    visual: 'chair_aeron',
    description: 'The ultimate throne of coding',
  },
  
  // Internet
  {
    id: 'dialup',
    name: 'Dial-up Modem',
    era: 5,
    cost: 200,
    effects: {},
    visual: 'net_dialup',
    description: '56k screaming into your ears',
  },
  {
    id: 'dsl',
    name: 'DSL Connection',
    era: 6,
    cost: 500,
    effects: { compileSpeed: 10 },
    visual: 'net_dsl',
    description: 'Always on! Revolutionary!',
  },
  {
    id: 'cable',
    name: 'Cable Internet',
    era: 7,
    cost: 800,
    effects: { compileSpeed: 20, incomeBoost: 10 },
    visual: 'net_cable',
    description: 'Download speed go brrr',
  },
  {
    id: 'fiber',
    name: 'Fiber Gigabit',
    era: 9,
    cost: 1200,
    effects: { compileSpeed: 30, incomeBoost: 20 },
    visual: 'net_fiber',
    description: 'Light speed is the limit',
  },
  
  // Computers
  {
    id: 'eniac_terminal',
    name: 'ENIAC Terminal Access',
    era: 1,
    cost: 0,
    effects: {},
    visual: 'computer_eniac',
    description: 'You get to use ENIAC!',
  },
  {
    id: 'mainframe_timeshare',
    name: 'Mainframe Timeshare',
    era: 2,
    cost: 1000,
    effects: { compileSpeed: 10 },
    visual: 'computer_mainframe',
    description: 'Your own slice of computing time',
  },
  {
    id: 'personal_pc',
    name: 'Personal Computer',
    era: 5,
    cost: 2000,
    effects: { compileSpeed: 20, bugReduction: 10 },
    visual: 'computer_pc',
    description: 'Your very own computer!',
  },
  {
    id: 'workstation',
    name: 'Workstation Beast',
    era: 8,
    cost: 5000,
    effects: { compileSpeed: 40, bugReduction: 20, incomeBoost: 15 },
    visual: 'computer_workstation',
    description: '64 cores of pure power',
  },
  
  // Decorations
  {
    id: 'calendar',
    name: 'Wall Calendar',
    era: 1,
    cost: 10,
    effects: {},
    visual: 'decor_calendar',
    description: 'Track the days',
  },
  {
    id: 'posters',
    name: 'Motivational Posters',
    era: 4,
    cost: 50,
    effects: { energyRegen: 5 },
    visual: 'decor_posters',
    description: 'Hang in there, kitten!',
  },
  {
    id: 'collectibles',
    name: 'Tech Collectibles',
    era: 7,
    cost: 500,
    effects: { energyRegen: 10 },
    visual: 'decor_collectibles',
    description: 'Action figures and old hardware',
  },
  {
    id: 'art',
    name: 'Original Art',
    era: 9,
    cost: 2000,
    effects: { energyRegen: 20, incomeBoost: 10 },
    visual: 'decor_art',
    description: 'You made it',
  },
];

export const getEquipmentById = (id: string): Equipment | undefined => 
  equipment.find(e => e.id === id);

export const getEquipmentByEra = (era: number): Equipment[] =>
  equipment.filter(e => e.era <= era);

export const calculateEquipmentEffects = (equipmentIds: string[]): Equipment['effects'] => {
  const effects = {
    bugReduction: 0,
    compileSpeed: 0,
    energyRegen: 0,
    incomeBoost: 0,
  };
  
  equipmentIds.forEach(id => {
    const item = getEquipmentById(id);
    if (item) {
      effects.bugReduction += item.effects.bugReduction || 0;
      effects.compileSpeed += item.effects.compileSpeed || 0;
      effects.energyRegen += item.effects.energyRegen || 0;
      effects.incomeBoost += item.effects.incomeBoost || 0;
    }
  });
  
  return effects;
};
