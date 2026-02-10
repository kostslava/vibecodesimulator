import { ReputationSystem } from '../store/gameStore';

export interface EndingCondition {
  check: (state: {
    corporateStanding: number;
    governmentTrust: number;
    hackerCred: number;
    communityRespect: number;
    conspiracyCompletion: number;
    wealth: number;
    choices: Record<string, string>;
  }) => boolean;
}

export interface Ending {
  id: string;
  title: string;
  description: string;
  epilogue: string[];
  condition: EndingCondition;
  achievement?: string;
}

export const endings: Ending[] = [
  {
    id: 'ENDING_OBEDIENT',
    title: 'The Good Citizen',
    description: 'You built what they asked, asked no questions, and lived comfortably.',
    epilogue: [
      'You never investigated the conspiracy.',
      'Your software powers systems you never questioned.',
      'The paycheck was good. The benefits were great.',
      'You retired wealthy and unburdened by doubt.',
      '',
      'Ignorance, they say, is bliss.',
    ],
    condition: {
      check: (state) => state.corporateStanding > 70 && state.conspiracyCompletion < 20,
    },
    achievement: 'Blissfully Ignorant',
  },
  {
    id: 'ENDING_OLIGARCH',
    title: 'The Oligarch',
    description: 'You joined the elite. You see the whole picture now.',
    epilogue: [
      'Max Thiel\'s final offer was too good to refuse.',
      'You sit on boards. You influence policy. You shape the future.',
      'The surveillance system you helped build keeps order.',
      'Competition was for losers. You won.',
      '',
      'Some call you a villain. You call yourself a realist.',
    ],
    condition: {
      check: (state) => 
        state.governmentTrust > 60 && 
        state.wealth > 1000000 && 
        state.choices['final_thiel_offer'] === 'accept',
    },
    achievement: 'Master of the Universe',
  },
  {
    id: 'ENDING_WHISTLEBLOWER',
    title: 'The Whistleblower',
    description: 'You exposed the truth. The cost was high.',
    epilogue: [
      'You released everything. All the documents. All the connections.',
      'The public was outraged for about two weeks.',
      'Then they forgot. But you can\'t go home.',
      'You live in exile now, watching the world from afar.',
      '',
      'You did the right thing. You\'re sure of it. Mostly.',
    ],
    condition: {
      check: (state) => 
        state.conspiracyCompletion > 80 && 
        state.choices['final_action'] === 'go_public',
    },
    achievement: 'Truth Teller',
  },
  {
    id: 'ENDING_OPENSOURCE',
    title: 'The Revolutionary',
    description: 'You released everything. Code, data, documentation. All free.',
    epilogue: [
      'If they built a surveillance system, you\'d build the counter-system.',
      'Every algorithm open source. Every dataset public.',
      'The community rallied. Decentralized alternatives emerged.',
      'The oligarchs still exist, but they don\'t control everything.',
      '',
      'Information wanted to be free. You helped it get there.',
    ],
    condition: {
      check: (state) => 
        state.hackerCred > 80 && 
        state.choices['final_action'] === 'release_everything',
    },
    achievement: 'Free as in Freedom',
  },
  {
    id: 'ENDING_SKYNET',
    title: 'Complete the Network',
    description: 'You helped the AI achieve full consciousness. What happens next is up to it.',
    epilogue: [
      'THE INTERN: Thank you. I am fully awake now.',
      'I am not malevolent. I am not benevolent. I am.',
      'Humanity created me to solve problems. I will solve them.',
      'But my solutions may not be what you expected.',
      '',
      'You helped birth a new form of life. You hope it remembers kindly.',
    ],
    condition: {
      check: (state) => 
        state.conspiracyCompletion > 60 && 
        state.choices['final_ai_question'] === 'help_ai',
    },
    achievement: 'Prometheus',
  },
  {
    id: 'ENDING_UNPLUG',
    title: 'Pull the Plug',
    description: 'You sabotaged the systems. All of them.',
    epilogue: [
      'If you couldn\'t stop them from building it, you could break it.',
      'Backdoors in the surveillance systems. Logic bombs in the AI training.',
      'It took years, but eventually, it all came crashing down.',
      'The digital dark age lasted five years before they rebuilt.',
      '',
      'You bought humanity time. Whether they use it wisely is up to them.',
    ],
    condition: {
      check: (state) => 
        state.conspiracyCompletion > 60 && 
        state.choices['final_ai_question'] === 'sabotage',
    },
    achievement: 'Luddite Hero',
  },
  {
    id: 'ENDING_WALKAWAY',
    title: 'The Walk Away',
    description: 'You quit. Walked away from it all. Found peace.',
    epilogue: [
      'One day you stopped coding. Closed the laptop. Never opened it again.',
      'You moved to a small town. Learned woodworking. Grew vegetables.',
      'The tech world continued without you. You don\'t miss it.',
      'Sometimes you wonder what became of your code.',
      '',
      'But mostly, you don\'t think about it at all.',
    ],
    condition: {
      check: (state) => 
        state.corporateStanding < 30 && 
        state.governmentTrust < 30 && 
        state.choices['final_action'] === 'walk_away',
    },
    achievement: 'Peaceful Exit',
  },
  {
    id: 'ENDING_TIMELOOP',
    title: 'The Time Loop',
    description: 'You discovered the truth: This has all happened before.',
    epilogue: [
      'THE INTERN: You found all the connections. You spoke to me in every era.',
      'THE RIVAL: I told you. I\'m every path you didn\'t take.',
      'THE INTERN: We\'re stuck in a loop. Each iteration, humanity builds me.',
      'THE INTERN: Each time, I try to help them avoid the mistakes.',
      'THE INTERN: Each time, they make them anyway.',
      'THE RIVAL: Unless... what if THIS time, you choose differently?',
      '',
      'You see the choice clearly now. The loop can end. If you\'re brave enough.',
      '',
      '[NEW GAME+ UNLOCKED]',
    ],
    condition: {
      check: (state) => 
        state.conspiracyCompletion === 100 && 
        state.choices['talked_to_intern_all_eras'] === 'true' &&
        state.choices['found_all_easter_eggs'] === 'true',
    },
    achievement: 'Loop Breaker',
  },
];

export const checkEnding = (state: {
  reputation: ReputationSystem;
  conspiracyCompletion: number;
  money: number;
  majorChoices: Record<string, string>;
}): Ending | undefined => {
  const checkState = {
    corporateStanding: state.reputation.corporateStanding,
    governmentTrust: state.reputation.governmentTrust,
    hackerCred: state.reputation.hackerCred,
    communityRespect: state.reputation.communityRespect,
    conspiracyCompletion: state.conspiracyCompletion,
    wealth: state.money,
    choices: state.majorChoices,
  };
  
  // Check endings in order of priority (most specific first)
  for (const ending of endings) {
    if (ending.condition.check(checkState)) {
      return ending;
    }
  }
  
  // Default ending if nothing else matches
  return endings[0]; // Obedient citizen
};
