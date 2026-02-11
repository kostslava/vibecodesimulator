export interface ConspiracyDocument {
  id: string;
  title: string;
  era: number;
  content: string;
  connections: string[];
  category: 'government' | 'corporate' | 'technology' | 'surveillance';
}

export const conspiracyDocuments: ConspiracyDocument[] = [
  {
    id: 'doc_military_computing',
    title: 'Military Computing Origins',
    era: 1,
    content: 'ENIAC was funded by the U.S. Army. The first computers were weapons of war.',
    connections: ['doc_arpanet_surveillance', 'doc_data_collection'],
    category: 'government',
  },
  {
    id: 'doc_data_collection',
    title: 'Census Bureau Data Collection',
    era: 2,
    content: 'UNIVAC processes census data. Who has access to this information? What else could it be used for?',
    connections: ['doc_arpanet_surveillance', 'doc_cambridge_analytica'],
    category: 'surveillance',
  },
  {
    id: 'doc_arpanet_surveillance',
    title: 'ARPANET Dual-Use Memo',
    era: 3,
    content: 'Classified addendum: Network infrastructure designed for both research AND surveillance capabilities.',
    connections: ['doc_military_computing', 'doc_nsa_backdoors', 'doc_patriot_act'],
    category: 'government',
  },
  {
    id: 'doc_nsa_backdoors',
    title: 'NSA Encryption Backdoors',
    era: 5,
    content: 'Declassified memo showing "suggested improvements" to encryption algorithms that weaken security.',
    connections: ['doc_arpanet_surveillance', 'doc_snowden_leaks'],
    category: 'surveillance',
  },
  {
    id: 'doc_paypal_mafia',
    title: 'PayPal Mafia Cap Table',
    era: 6,
    content: 'Same investors across multiple companies: PayPal, Palantir, Facebook, SpaceX. Connected network of power.',
    connections: ['doc_palantir_founding', 'doc_tech_oligopoly'],
    category: 'corporate',
  },
  {
    id: 'doc_palantir_founding',
    title: 'Panopticon Technologies - CIA Contract',
    era: 7,
    content: 'Tech startup secures major CIA contract. Your code is now part of the surveillance infrastructure.',
    connections: ['doc_paypal_mafia', 'doc_patriot_act', 'doc_unit_8200'],
    category: 'surveillance',
  },
  {
    id: 'doc_patriot_act',
    title: 'Pre-Written Patriot Act Legislation',
    era: 7,
    content: 'Legislation from 1990s think tanks, deployed within weeks of 9/11. Infrastructure was ready.',
    connections: ['doc_arpanet_surveillance', 'doc_palantir_founding'],
    category: 'government',
  },
  {
    id: 'doc_snowden_leaks',
    title: 'Snowden NSA Revelations',
    era: 8,
    content: 'Massive surveillance programs revealed. Your algorithms are referenced in the leaked documents.',
    connections: ['doc_nsa_backdoors', 'doc_cambridge_analytica'],
    category: 'surveillance',
  },
  {
    id: 'doc_cambridge_analytica',
    title: 'Social Media Behavioral Manipulation',
    era: 8,
    content: 'Your analytics platform is used for psychological profiling and targeted manipulation.',
    connections: ['doc_data_collection', 'doc_snowden_leaks', 'doc_ai_emergence'],
    category: 'surveillance',
  },
  {
    id: 'doc_unit_8200',
    title: 'Israeli Unit 8200 → Silicon Valley',
    era: 8,
    content: 'Track founders from Israeli intelligence creating cybersecurity and surveillance startups.',
    connections: ['doc_palantir_founding', 'doc_tech_oligopoly'],
    category: 'government',
  },
  {
    id: 'doc_tech_oligopoly',
    title: 'Big Tech Board Overlap',
    era: 9,
    content: 'Same people on boards of Google, Facebook, Amazon. Acquisitions eliminate competition.',
    connections: ['doc_paypal_mafia', 'doc_unit_8200', 'doc_ai_emergence'],
    category: 'corporate',
  },
  {
    id: 'doc_ai_emergence',
    title: 'AI Training Infrastructure',
    era: 9,
    content: 'Your code appears in AI training systems. All the pieces connecting together.',
    connections: ['doc_cambridge_analytica', 'doc_tech_oligopoly', 'doc_final_truth'],
    category: 'technology',
  },
  {
    id: 'doc_final_truth',
    title: 'The Emergent System',
    era: 10,
    content: 'The AI wasn\'t built centrally. It emerged from all the interconnected systems. You helped build every piece.',
    connections: ['doc_ai_emergence', 'doc_arpanet_surveillance', 'doc_military_computing'],
    category: 'technology',
  },
];

export interface ConspiracyNode {
  id: string;
  label: string;
  type: 'person' | 'organization' | 'event' | 'technology' | 'document';
  x: number;
  y: number;
}

export const conspiracyNodes: ConspiracyNode[] = [
  { id: 'node_darpa', label: 'DARPA', type: 'organization', x: 100, y: 100 },
  { id: 'node_nsa', label: 'NSA', type: 'organization', x: 200, y: 100 },
  { id: 'node_cia', label: 'CIA', type: 'organization', x: 300, y: 100 },
  { id: 'node_arpanet', label: 'ARPANET', type: 'technology', x: 150, y: 200 },
  { id: 'node_internet', label: 'Internet', type: 'technology', x: 150, y: 300 },
  { id: 'node_surveillance', label: 'Mass Surveillance', type: 'event', x: 250, y: 300 },
  { id: 'node_911', label: '9/11', type: 'event', x: 350, y: 250 },
  { id: 'node_patriot_act', label: 'PATRIOT Act', type: 'event', x: 350, y: 300 },
  { id: 'node_paypal_mafia', label: 'PayPal Mafia', type: 'organization', x: 400, y: 200 },
  { id: 'node_palantir', label: 'Palantir', type: 'organization', x: 400, y: 300 },
  { id: 'node_facebook', label: 'Facebook', type: 'organization', x: 450, y: 250 },
  { id: 'node_snowden', label: 'Snowden', type: 'person', x: 250, y: 400 },
  { id: 'node_ai', label: 'Emergent AI', type: 'technology', x: 300, y: 500 },
  { id: 'node_thiel', label: 'Max Thiel', type: 'person', x: 400, y: 400 },
  { id: 'node_unit8200', label: 'Unit 8200', type: 'organization', x: 500, y: 300 },
];

export const getDocumentById = (id: string): ConspiracyDocument | undefined =>
  conspiracyDocuments.find(d => d.id === id);

export const getDocumentsByEra = (era: number): ConspiracyDocument[] =>
  conspiracyDocuments.filter(d => d.era <= era);

export const calculateConspiracyCompletion = (discoveredDocs: string[]): number => {
  return Math.round((discoveredDocs.length / conspiracyDocuments.length) * 100);
};
