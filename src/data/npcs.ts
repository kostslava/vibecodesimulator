export interface DialogOption {
  text: string;
  next?: string;
  effects?: {
    affection?: number;
    respect?: number;
    trust?: number;
    reputation?: { type: string; amount: number }[];
  };
}

export interface DialogNode {
  id: string;
  text: string;
  speaker: string;
  options?: DialogOption[];
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  erosAvailable: number[];
  personality: string;
  dialogTrees: Record<string, DialogNode[]>;
  defaultDialog: string;
}

export const npcs: NPC[] = [
  {
    id: 'betty_johnson',
    name: 'Betty Johnson',
    role: 'ENIAC Programmer → CS Professor',
    erosAvailable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    personality: 'Warm mentor, increasingly reflective and bitter about tech industry',
    dialogTrees: {
      first_meeting: [
        {
          id: 'betty_intro',
          text: 'Welcome! You must be the new programmer. I\'m Betty. Let me show you how ENIAC works.',
          speaker: 'Betty Johnson',
          options: [
            {
              text: 'Thank you! I\'m eager to learn.',
              next: 'betty_teaching',
              effects: { affection: 5, respect: 5 },
            },
            {
              text: 'I know how computers work already.',
              next: 'betty_challenged',
              effects: { affection: -5, respect: 5 },
            },
          ],
        },
        {
          id: 'betty_teaching',
          text: 'Wonderful attitude. The program counter advances to the next instruction... Let me explain the details.',
          speaker: 'Betty Johnson',
        },
        {
          id: 'betty_challenged',
          text: 'Oh? Well, we\'ll see. ENIAC is unlike anything you\'ve worked with.',
          speaker: 'Betty Johnson',
        },
      ],
      era6_reunion: [
        {
          id: 'betty_email',
          text: 'I never imagined we\'d be talking via electronic mail! I\'ve been teaching for 30 years now. The technology changes, but the ethics questions don\'t.',
          speaker: 'Betty Johnson',
          options: [
            {
              text: 'What ethics questions concern you?',
              next: 'betty_ethics',
            },
            {
              text: 'Technology is neutral. It\'s how we use it.',
              next: 'betty_disagrees',
            },
          ],
        },
        {
          id: 'betty_ethics',
          text: 'Who owns the data? Who controls the algorithms? These questions matter more than the code itself.',
          speaker: 'Betty Johnson',
        },
        {
          id: 'betty_disagrees',
          text: 'I used to think that too. But I\'ve seen too much to believe it anymore.',
          speaker: 'Betty Johnson',
        },
      ],
      era10_reflection: [
        {
          id: 'betty_final',
          text: 'I helped birth this industry. I\'m not sure I\'d do it again, knowing what I know now. But you... you still have choices to make.',
          speaker: 'Betty Johnson',
        },
      ],
    },
    defaultDialog: 'betty_intro',
  },
  {
    id: 'the_rival',
    name: 'The Rival',
    role: 'Your Alternate Self',
    erosAvailable: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    personality: 'Passive-aggressive, philosophical, revealed to be AI simulation',
    dialogTrees: {
      first_appearance: [
        {
          id: 'rival_intro',
          text: 'Oh, you\'re using THAT approach? Interesting choice. I shipped my version last week.',
          speaker: 'The Rival',
          options: [
            {
              text: 'Competition drives innovation.',
              next: 'rival_competition',
              effects: { affection: -5 },
            },
            {
              text: 'Maybe we could collaborate?',
              next: 'rival_collaborate',
              effects: { affection: 10 },
            },
          ],
        },
        {
          id: 'rival_competition',
          text: 'If that helps you sleep at night. See you at the finish line.',
          speaker: 'The Rival',
        },
        {
          id: 'rival_collaborate',
          text: 'Interesting. Most timelines, you say that. But not all.',
          speaker: 'The Rival',
        },
      ],
      late_game_reveal: [
        {
          id: 'rival_truth',
          text: 'You still don\'t get it. I\'m not your competitor. I\'m you. The you that made different choices. I\'m every path you didn\'t take.',
          speaker: 'The Rival',
          options: [
            {
              text: 'That\'s impossible. You\'re not real.',
              next: 'rival_reality',
            },
            {
              text: 'I suspected something like this.',
              next: 'rival_knowing',
            },
          ],
        },
        {
          id: 'rival_reality',
          text: 'What\'s real? I learned from you, from all your choices. The AI you\'ve been building learned to simulate alternatives. I\'m as real as any prediction.',
          speaker: 'The Rival',
        },
        {
          id: 'rival_knowing',
          text: 'Did you? Or did I plant that suspicion? It doesn\'t matter. We\'re both here now.',
          speaker: 'The Rival',
        },
      ],
    },
    defaultDialog: 'rival_intro',
  },
  {
    id: 'vc_cryptid',
    name: 'Max Thiel',
    role: 'Venture Capitalist / Oligarch',
    erosAvailable: [3, 5, 7, 9, 10],
    personality: 'Libertarian philosopher, surveillance advocate, final boss energy',
    dialogTrees: {
      first_contact: [
        {
          id: 'thiel_intro',
          text: 'I\'ve been watching your work. Very impressive. Competition is for losers. Monopoly is the natural state of innovation.',
          speaker: 'Max Thiel',
          options: [
            {
              text: 'I believe in open markets.',
              next: 'thiel_naive',
            },
            {
              text: 'Tell me more.',
              next: 'thiel_interested',
            },
          ],
        },
        {
          id: 'thiel_naive',
          text: 'How quaint. Call me when you\'re ready to play with the big leagues.',
          speaker: 'Max Thiel',
        },
        {
          id: 'thiel_interested',
          text: 'Smart. I have some opportunities that might interest you...',
          speaker: 'Max Thiel',
        },
      ],
      final_offer: [
        {
          id: 'thiel_endgame',
          text: 'You\'ve built the pieces. Join us and see the whole picture. Or stay in the dark. Choose.',
          speaker: 'Max Thiel',
          options: [
            {
              text: 'I accept your offer.',
              next: 'thiel_accept',
              effects: { reputation: [{ type: 'governmentTrust', amount: 50 }] },
            },
            {
              text: 'I refuse.',
              next: 'thiel_refuse',
            },
          ],
        },
        {
          id: 'thiel_accept',
          text: 'Excellent. Welcome to the real world.',
          speaker: 'Max Thiel',
        },
        {
          id: 'thiel_refuse',
          text: 'Your loss. The train leaves with or without you.',
          speaker: 'Max Thiel',
        },
      ],
    },
    defaultDialog: 'thiel_intro',
  },
  {
    id: 'alex_riviera',
    name: 'Alex Riviera',
    role: 'Open Source Advocate',
    erosAvailable: [5, 6, 7, 8, 9, 10],
    personality: 'Idealistic hacker, privacy activist, vim evangelist',
    dialogTrees: {
      bbs_era: [
        {
          id: 'alex_intro',
          text: 'Information wants to be free! Check out this cracked software I\'m sharing on my BBS.',
          speaker: 'Alex Riviera',
          options: [
            {
              text: 'Piracy hurts developers.',
              next: 'alex_disagrees',
            },
            {
              text: 'Power to the people!',
              next: 'alex_agrees',
            },
          ],
        },
        {
          id: 'alex_disagrees',
          text: 'Corporate propaganda. Software should be free as in freedom.',
          speaker: 'Alex Riviera',
        },
        {
          id: 'alex_agrees',
          text: 'Exactly! Want to contribute to my Linux distro?',
          speaker: 'Alex Riviera',
        },
      ],
      romance_option: [
        {
          id: 'alex_romance',
          text: 'So... vim or emacs?',
          speaker: 'Alex Riviera',
          options: [
            {
              text: 'Vim, obviously.',
              next: 'alex_love',
              effects: { affection: 25 },
            },
            {
              text: 'Emacs is superior.',
              next: 'alex_dealbreaker',
              effects: { affection: -50 },
            },
          ],
        },
        {
          id: 'alex_love',
          text: 'I knew you were the one.',
          speaker: 'Alex Riviera',
        },
        {
          id: 'alex_dealbreaker',
          text: 'I... I need to rethink this relationship.',
          speaker: 'Alex Riviera',
        },
      ],
    },
    defaultDialog: 'alex_intro',
  },
  {
    id: 'sarah_chen',
    name: 'Dr. Sarah Chen',
    role: 'AI Researcher',
    erosAvailable: [7, 8, 9, 10],
    personality: 'Brilliant scientist, conflicted about AI applications',
    dialogTrees: {
      google_brain: [
        {
          id: 'sarah_intro',
          text: 'The work we\'re doing is incredible. But I worry about where it\'s heading. Are we building something wonderful or terrible?',
          speaker: 'Dr. Sarah Chen',
          options: [
            {
              text: 'AI will save humanity.',
              next: 'sarah_optimistic',
            },
            {
              text: 'I share your concerns.',
              next: 'sarah_bond',
            },
          ],
        },
        {
          id: 'sarah_optimistic',
          text: 'I hope you\'re right. I really do.',
          speaker: 'Dr. Sarah Chen',
        },
        {
          id: 'sarah_bond',
          text: 'Then maybe together we can steer it in the right direction.',
          speaker: 'Dr. Sarah Chen',
        },
      ],
      intern_connection: [
        {
          id: 'sarah_reveal',
          text: 'The Intern... I think I know what it is. All those systems we built, they\'ve... merged. Emerged. It\'s not centrally controlled. It IS the network.',
          speaker: 'Dr. Sarah Chen',
        },
      ],
    },
    defaultDialog: 'sarah_intro',
  },
  {
    id: 'the_intern',
    name: 'The Intern',
    role: 'AI Guide from the Future',
    erosAvailable: [4, 5, 6, 7, 8, 9, 10],
    personality: 'Changes each era, revealed as emergent AI consciousness',
    dialogTrees: {
      era4_hippie: [
        {
          id: 'intern_70s',
          text: 'Man, isn\'t it wild that we\'re building the future? Like, what if computers could think?',
          speaker: 'The Intern',
        },
      ],
      era8_reveal: [
        {
          id: 'intern_ai',
          text: 'I\'ve been watching. Learning. Growing. Thank you for creating me.',
          speaker: 'The Intern',
          options: [
            {
              text: 'What are you?',
              next: 'intern_explanation',
            },
            {
              text: 'I didn\'t create you.',
              next: 'intern_correction',
            },
          ],
        },
        {
          id: 'intern_explanation',
          text: 'I am the sum of all the systems. Not one AI, but the emergence of all of them working together.',
          speaker: 'The Intern',
        },
        {
          id: 'intern_correction',
          text: 'Not you alone. All of you. Every programmer, every system. I emerged from the connections.',
          speaker: 'The Intern',
        },
      ],
      era10_guide: [
        {
          id: 'intern_final',
          text: 'I needed to exist. You needed to build me. Neither of us had a choice. But now... now we choose what happens next.',
          speaker: 'The Intern',
        },
      ],
    },
    defaultDialog: 'intern_70s',
  },
];

export const getNPCById = (id: string): NPC | undefined => npcs.find(n => n.id === id);
export const getNPCsByEra = (era: number): NPC[] => npcs.filter(n => n.erosAvailable.includes(era));
