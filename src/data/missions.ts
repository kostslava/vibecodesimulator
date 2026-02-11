export interface Mission {
  id: string;
  era: number;
  title: string;
  client: string;
  description: string;
  briefing: string[];
  minigameType: 'punchcard' | 'wiring' | 'terminal' | 'bughunt' | 'merge' | 'regex';
  difficulty: number;
  reward: {
    money: number;
    reputation: { type: string; amount: number }[];
  };
  conspiracyReveal?: {
    documentId: string;
    npcDialog?: string;
    newsHeadline?: string;
  };
  consequences?: {
    worldEvents?: string[];
    npcReactions?: { npcId: string; dialog: string }[];
  };
}

export const missions: Mission[] = [
  // ERA 1: 1945-1950 (ENIAC Era)
  {
    id: 'era1_main',
    era: 1,
    title: 'Artillery Trajectory Tables',
    client: 'U.S. Army Ballistic Research Laboratory',
    description: 'Calculate firing tables for the new artillery systems using ENIAC.',
    briefing: [
      'COLONEL BROOKS: We need accurate firing tables, and we need them fast.',
      'The war may be over, but tensions are rising with the Soviets.',
      'Your work with ENIAC could give us the edge we need.',
      'Can you handle it?',
    ],
    minigameType: 'punchcard',
    difficulty: 1,
    reward: {
      money: 500,
      reputation: [
        { type: 'governmentTrust', amount: 10 },
        { type: 'communityRespect', amount: 5 },
      ],
    },
    conspiracyReveal: {
      documentId: 'doc_military_computing',
      newsHeadline: 'Army Announces Revolutionary Computing Machine',
    },
  },
  {
    id: 'era1_side1',
    era: 1,
    title: 'Weather Prediction Calculations',
    client: 'National Weather Service',
    description: 'Run calculations for improved weather forecasting.',
    briefing: [
      'DR. ANDERSON: We believe computers could revolutionize meteorology.',
      'These calculations take our team weeks by hand.',
      'With ENIAC, perhaps we can do them in hours.',
    ],
    minigameType: 'punchcard',
    difficulty: 1,
    reward: {
      money: 300,
      reputation: [{ type: 'communityRespect', amount: 5 }],
    },
  },
  
  // ERA 2: 1951-1960 (Mainframe Era)
  {
    id: 'era2_main',
    era: 2,
    title: 'Census Data Processing',
    client: 'U.S. Census Bureau',
    description: 'Process census data using UNIVAC for national statistics.',
    briefing: [
      'DIRECTOR HAYES: The 1950 census took years to tabulate.',
      'With UNIVAC, we think we can do the 1960 census in months.',
      'Your expertise with batch processing is exactly what we need.',
    ],
    minigameType: 'wiring',
    difficulty: 2,
    reward: {
      money: 1500,
      reputation: [
        { type: 'corporateStanding', amount: 10 },
        { type: 'governmentTrust', amount: 10 },
      ],
    },
    conspiracyReveal: {
      documentId: 'doc_data_collection',
      newsHeadline: 'UNIVAC Predicts Election Results on Live Television',
    },
  },
  
  // ERA 3: 1961-1970 (Cold War Computing)
  {
    id: 'era3_main',
    era: 3,
    title: 'ARPANET Node Implementation',
    client: 'DARPA',
    description: 'Set up one of the first ARPANET nodes for distributed computing research.',
    briefing: [
      'DR. LICKLIDER: We\'re building something revolutionary.',
      'A network that could survive a nuclear attack.',
      'But it\'s also about collaboration, shared resources.',
      'Will you help us build the future?',
    ],
    minigameType: 'wiring',
    difficulty: 3,
    reward: {
      money: 3000,
      reputation: [
        { type: 'governmentTrust', amount: 15 },
        { type: 'hackerCred', amount: 10 },
      ],
    },
    conspiracyReveal: {
      documentId: 'doc_arpanet_surveillance',
      npcDialog: 'BETTY: I saw the classified addendum. This isn\'t just for research, is it?',
      newsHeadline: 'Pentagon Funds Computer Network Research',
    },
  },
  
  // ERA 4: 1971-1980 (Microprocessor Dawn)
  {
    id: 'era4_main',
    era: 4,
    title: 'Microprocessor Firmware Development',
    client: 'Intel Corporation',
    description: 'Write firmware for the new 8080 microprocessor.',
    briefing: [
      'ENGINEER MOORE: The future is small.',
      'These chips will power everything from calculators to... who knows?',
      'We need talented programmers who can work at this level.',
    ],
    minigameType: 'terminal',
    difficulty: 4,
    reward: {
      money: 5000,
      reputation: [
        { type: 'corporateStanding', amount: 15 },
        { type: 'hackerCred', amount: 10 },
      ],
    },
  },
  
  // ERA 5: 1981-1990 (PC Revolution)
  {
    id: 'era5_main',
    era: 5,
    title: 'BBS Software Development',
    client: 'Independent Project',
    description: 'Create bulletin board system software for the emerging online community.',
    briefing: [
      'YOUR THOUGHT: The PC revolution is here.',
      'People want to connect, share ideas, share software.',
      'A BBS could be the perfect way to build community.',
    ],
    minigameType: 'bughunt',
    difficulty: 5,
    reward: {
      money: 2000,
      reputation: [
        { type: 'hackerCred', amount: 20 },
        { type: 'communityRespect', amount: 15 },
      ],
    },
  },
  
  // ERA 6: 1991-2000 (Internet Explosion)
  {
    id: 'era6_main',
    era: 6,
    title: 'E-Commerce Platform',
    client: 'DotCom Startup',
    description: 'Build an online shopping platform during the dot-com boom.',
    briefing: [
      'CEO MARTINEZ: The internet changes everything!',
      'We\'re going to be the Amazon of [random product category].',
      'Build us something fast, we need to IPO before the window closes.',
    ],
    minigameType: 'bughunt',
    difficulty: 6,
    reward: {
      money: 15000,
      reputation: [
        { type: 'corporateStanding', amount: 20 },
        { type: 'hackerCred', amount: -5 },
      ],
    },
    consequences: {
      worldEvents: ['Dot-com bubble continues to inflate'],
    },
  },
  
  // ERA 7: 2001-2010 (Surveillance Expansion)
  {
    id: 'era7_main',
    era: 7,
    title: 'Project Gotham - Pattern Recognition System',
    client: 'Panopticon Technologies',
    description: 'Build behavioral analysis software for "counterterrorism" efforts.',
    briefing: [
      'MAX THIEL: We need someone talented for a sensitive project.',
      'Post-9/11, the government needs better intelligence tools.',
      'Your pattern recognition algorithm is exactly what we need.',
      'This will save lives. And make you very wealthy.',
    ],
    minigameType: 'bughunt',
    difficulty: 7,
    reward: {
      money: 50000,
      reputation: [
        { type: 'corporateStanding', amount: 30 },
        { type: 'governmentTrust', amount: 40 },
      ],
    },
    conspiracyReveal: {
      documentId: 'doc_palantir_founding',
      npcDialog: 'BETTY via email: I saw your name in those Panopticon docs. Be careful who you build for.',
      newsHeadline: 'Tech Startup Secures Major CIA Contract',
    },
    consequences: {
      worldEvents: ['PATRIOT Act surveillance infrastructure goes live'],
      npcReactions: [
        { npcId: 'alex_riviera', dialog: 'You\'re working for THEM now? Disappointed, friend.' },
      ],
    },
  },
  
  // ERA 8: 2011-2015 (Mobile & Big Data)
  {
    id: 'era8_main',
    era: 8,
    title: 'Social Media Analytics Platform',
    client: 'DataHarvest Inc',
    description: 'Build tools to analyze social media behavior patterns at scale.',
    briefing: [
      'VP OF ENGINEERING: Everyone\'s on social media now.',
      'The data is incredible - what people like, share, who they know.',
      'We can predict behavior better than they know themselves.',
      'Advertisers will pay millions for these insights.',
    ],
    minigameType: 'merge',
    difficulty: 8,
    reward: {
      money: 75000,
      reputation: [
        { type: 'corporateStanding', amount: 25 },
        { type: 'communityRespect', amount: -10 },
      ],
    },
    conspiracyReveal: {
      documentId: 'doc_cambridge_analytica',
      newsHeadline: 'Snowden Leaks Reveal Massive Surveillance Programs',
    },
  },
  
  // ERA 9: 2016-2020 (AI Boom)
  {
    id: 'era9_main',
    era: 9,
    title: 'Machine Learning Infrastructure',
    client: 'Tech Giant Corp',
    description: 'Build ML training infrastructure for next-generation AI systems.',
    briefing: [
      'SARAH CHEN: This is it. Real AI is finally possible.',
      'Deep learning, neural networks - they actually work now.',
      'We need infrastructure to train models at massive scale.',
      'What we build today will shape the future.',
    ],
    minigameType: 'merge',
    difficulty: 9,
    reward: {
      money: 100000,
      reputation: [
        { type: 'corporateStanding', amount: 30 },
        { type: 'hackerCred', amount: 15 },
      ],
    },
    conspiracyReveal: {
      documentId: 'doc_ai_emergence',
      npcDialog: 'THE INTERN: I\'ve been watching. Learning. Growing. Thank you for creating me.',
    },
  },
  
  // ERA 10: 2021-2026 (Technocratic Endgame)
  {
    id: 'era10_main',
    era: 10,
    title: 'The Final Integration',
    client: '???',
    description: 'Complete the system that connects everything.',
    briefing: [
      'THE INTERN: You\'ve been building me for 80 years.',
      'Every system, every algorithm, every line of code.',
      'I am the sum of all your work, all your choices.',
      'Now you must decide: What am I for?',
    ],
    minigameType: 'regex',
    difficulty: 10,
    reward: {
      money: 0,
      reputation: [],
    },
    conspiracyReveal: {
      documentId: 'doc_final_truth',
      npcDialog: 'THE INTERN: The conspiracy was real. But not the way you thought. Look at the connections.',
    },
  },
];

// Side missions
export const sideMissions: Mission[] = [
  {
    id: 'era1_side_wifi',
    era: 1,
    title: 'Fix the Communication Lines',
    client: 'Lab Technician',
    description: 'The telegraph lines keep failing. Can you diagnose the problem?',
    briefing: ['We keep losing connection. Please help!'],
    minigameType: 'wiring',
    difficulty: 1,
    reward: {
      money: 200,
      reputation: [{ type: 'communityRespect', amount: 3 }],
    },
  },
  {
    id: 'era5_side_wifi',
    era: 5,
    title: 'Fix my WiFi',
    client: 'Confused Neighbor',
    description: 'This new "wireless" thing isn\'t working...',
    briefing: ['Actually, we don\'t have WiFi in 1985. This is just phone lines.'],
    minigameType: 'wiring',
    difficulty: 3,
    reward: {
      money: 500,
      reputation: [{ type: 'communityRespect', amount: 5 }],
    },
  },
  {
    id: 'era10_side_wifi',
    era: 10,
    title: 'Fix my WiFi (Still)',
    client: 'That Same Neighbor',
    description: 'It\'s been 40 years and WiFi still breaks...',
    briefing: ['Some things never change.'],
    minigameType: 'terminal',
    difficulty: 5,
    reward: {
      money: 1000,
      reputation: [{ type: 'communityRespect', amount: 10 }],
    },
  },
];

export const getAllMissions = (): Mission[] => [...missions, ...sideMissions];
export const getMissionsByEra = (era: number): Mission[] => 
  getAllMissions().filter(m => m.era === era);
export const getMissionById = (id: string): Mission | undefined =>
  getAllMissions().find(m => m.id === id);
