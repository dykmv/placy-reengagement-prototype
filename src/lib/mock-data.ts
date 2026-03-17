// Mock data for Placy Re-engagement Prototype — Cyprus market

export type LeadStatus = "interested" | "callback_later" | "not_interested" | "not_reachable" | "pending";
export type Channel = "whatsapp" | "voice" | "both";
export type AutomationStatus = "active" | "paused" | "draft" | "complete";
export type DealType = "sale" | "rent";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: LeadStatus;
  dealType: DealType;
  city: string;
  interest: string;
  budget: string;
  agent: string;
  source: string;
  lastFollowUp: string;
  daysInactive: number;
  aiSummary?: string;
  contactDate?: string;
  contactChannel?: Channel;
  conversation?: ConversationMessage[];
  crmUpdated?: boolean;
}

export interface ConversationMessage {
  sender: "bot" | "lead";
  text: string;
  time: string;
}

export interface AutomationRun {
  date: string;
  leadsQueued: number;
  contacted: number;
  interested: number;
  callback: number;
  notInterested: number;
  notReachable: number;
  errors: number;
}

export interface Automation {
  id: string;
  name: string;
  status: AutomationStatus;
  dealType: DealType;
  city: string;
  channel: string;
  schedule: string;
  waTime: string;
  voiceWindow: string;
  batchSize: number;
  statuses: string[];
  inactivityDays: number;
  matchingLeads: number;
  totalProcessed: number;
  totalInterested: number;
  lastRun?: string;
  nextRun?: string;
  runs: AutomationRun[];
}

// === AGENTS ===
export const AGENTS = [
  { name: "Nikos Andreou", leads: 45 },
  { name: "Maria Georgiou", leads: 38 },
  { name: "Elena Papadopoulou", leads: 29 },
];

// === LEADS ===
export const MOCK_LEADS: Lead[] = [
  // Interested leads
  {
    id: "L001",
    name: "Alexei Petrov",
    phone: "+357 99 456 789",
    email: "alexei.p@gmail.com",
    status: "interested",
    dealType: "sale",
    city: "Limassol",
    interest: "2-bed apartment",
    budget: "€280,000",
    agent: "Nikos Andreou",
    source: "Facebook Ads",
    lastFollowUp: "2025-12-18",
    daysInactive: 89,
    aiSummary: "Lead confirmed active interest. Budget updated from €250K to €280K. Prefers ground floor with garden. Limassol, close to sea. Available to view properties next week. Speaks Russian and English.",
    contactDate: "2026-03-17",
    contactChannel: "whatsapp",
    crmUpdated: true,
    conversation: [
      { sender: "bot", text: "Hi Alexei, this is Sarah from MySpace Real Estate. You were looking at property for sale in Limassol some time ago. Is your request still relevant? We'd love to help you find the right option!", time: "09:31" },
      { sender: "lead", text: "Yes, still looking. Budget is around 280K now. Need ground floor.", time: "11:45" },
      { sender: "bot", text: "Great! What area do you prefer in Limassol?", time: "11:45" },
      { sender: "lead", text: "Close to sea. Garden would be nice.", time: "11:52" },
      { sender: "bot", text: "Perfect. I'll pass your details to our agent Nikos who will reach out with personalized options. Thank you, Alexei!", time: "11:52" },
    ],
  },
  {
    id: "L002",
    name: "Elena Volkova",
    phone: "+357 96 812 345",
    email: "elena.v@mail.ru",
    status: "interested",
    dealType: "sale",
    city: "Limassol",
    interest: "2-bed apartment",
    budget: "€220,000",
    agent: "Maria Georgiou",
    source: "Bazaraki",
    lastFollowUp: "2025-12-22",
    daysInactive: 85,
    aiSummary: "Still looking for 2-bed in Limassol. Timeline: 3 months. Budget €220K. Prefers Germasogeia area. Speaks Russian.",
    contactDate: "2026-03-17",
    contactChannel: "whatsapp",
    crmUpdated: true,
    conversation: [
      { sender: "bot", text: "Hi Elena, this is Sarah from MySpace Real Estate. You were looking at property for sale in Limassol some time ago. Is your request still relevant?", time: "09:32" },
      { sender: "lead", text: "Да, ещё ищу. Двушку в Гермасогее, бюджет 220. Планируем переезд через 3 месяца.", time: "10:15" },
      { sender: "bot", text: "Отлично! Передам информацию агенту Maria, она свяжется с вами с подходящими вариантами. Спасибо!", time: "10:15" },
    ],
  },
  {
    id: "L003",
    name: "James Smith",
    phone: "+44 79 1234 5678",
    email: "j.smith@outlook.com",
    status: "interested",
    dealType: "sale",
    city: "Limassol",
    interest: "Villa",
    budget: "€450,000",
    agent: "Nikos Andreou",
    source: "Google Ads",
    lastFollowUp: "2025-12-05",
    daysInactive: 102,
    aiSummary: "Wants villa in Limassol, budget €400-500K. Relocating from UK for permanent residency. Ready to visit and view properties. Prefers modern style with pool.",
    contactDate: "2026-03-16",
    contactChannel: "voice",
    crmUpdated: true,
    conversation: [
      { sender: "bot", text: "Hello, am I speaking with James? Hi James, this is Sarah calling from MySpace Real Estate. You inquired about property in Limassol some time ago — are you still looking?", time: "17:32" },
      { sender: "lead", text: "Yes, actually we are. We're looking at villas now, budget around 400-500K. Planning to relocate from the UK.", time: "17:32" },
      { sender: "bot", text: "That's great! What style of villa are you looking for?", time: "17:33" },
      { sender: "lead", text: "Modern, with a pool ideally. We'd like to come and view in the next few weeks.", time: "17:33" },
      { sender: "bot", text: "Wonderful. I'll pass your details to Nikos who specializes in villas in the Limassol area. He'll reach out with some options. Thank you, James!", time: "17:34" },
    ],
  },
  {
    id: "L004",
    name: "Maria Christodoulou",
    phone: "+357 97 654 321",
    status: "interested",
    dealType: "sale",
    city: "Paphos",
    interest: "Townhouse",
    budget: "€320,000",
    agent: "Elena Papadopoulou",
    source: "Website",
    lastFollowUp: "2026-01-03",
    daysInactive: 73,
    aiSummary: "Looking for townhouse in Paphos, Kato Paphos area. Budget €300-350K. For retirement. No rush — planning for next year.",
    contactDate: "2026-03-17",
    contactChannel: "whatsapp",
    crmUpdated: true,
  },
  // Callback Later
  {
    id: "L005",
    name: "Dmitry Sokolov",
    phone: "+7 905 123 4567",
    status: "callback_later",
    dealType: "sale",
    city: "Limassol",
    interest: "3-bed apartment",
    budget: "€350,000",
    agent: "Nikos Andreou",
    source: "Facebook Ads",
    lastFollowUp: "2025-12-28",
    daysInactive: 79,
    aiSummary: "Still interested but not ready to visit until June. Budget €350K for 3-bed in Limassol. Asked to be contacted again in May.",
    contactDate: "2026-03-17",
    contactChannel: "whatsapp",
    crmUpdated: true,
  },
  {
    id: "L006",
    name: "Anna Konstantinou",
    phone: "+357 99 876 543",
    status: "callback_later",
    dealType: "rent",
    city: "Limassol",
    interest: "1-bed apartment",
    budget: "€1,200/mo",
    agent: "Maria Georgiou",
    source: "Bazaraki",
    lastFollowUp: "2026-02-25",
    daysInactive: 20,
    aiSummary: "Still looking for rental but lease on current apartment ends in May. Wants to be contacted in April.",
    contactDate: "2026-03-16",
    contactChannel: "whatsapp",
    crmUpdated: true,
  },
  // Not Interested
  {
    id: "L007",
    name: "George Papadopoulos",
    phone: "+357 96 111 222",
    status: "not_interested",
    dealType: "sale",
    city: "Limassol",
    interest: "2-bed apartment",
    budget: "€200,000",
    agent: "Nikos Andreou",
    source: "Facebook Ads",
    lastFollowUp: "2025-11-15",
    daysInactive: 122,
    aiSummary: "Already purchased property elsewhere. Not looking anymore.",
    contactDate: "2026-03-17",
    contactChannel: "whatsapp",
    crmUpdated: true,
  },
  {
    id: "L008",
    name: "Irina Kuznetsova",
    phone: "+7 916 555 7890",
    status: "not_interested",
    dealType: "sale",
    city: "Limassol",
    interest: "Villa",
    budget: "€500,000",
    agent: "Elena Papadopoulou",
    source: "Google Ads",
    lastFollowUp: "2025-12-10",
    daysInactive: 97,
    aiSummary: "Plans changed — no longer considering Cyprus. Bought in Spain instead.",
    contactDate: "2026-03-16",
    contactChannel: "voice",
    crmUpdated: true,
  },
  {
    id: "L009",
    name: "Stavros Nikolaou",
    phone: "+357 99 333 444",
    status: "not_interested",
    dealType: "rent",
    city: "Limassol",
    interest: "2-bed apartment",
    budget: "€1,500/mo",
    agent: "Maria Georgiou",
    source: "Bazaraki",
    lastFollowUp: "2026-02-01",
    daysInactive: 44,
    aiSummary: "Found rental already. Asked not to be contacted again.",
    contactDate: "2026-03-17",
    contactChannel: "whatsapp",
    crmUpdated: true,
  },
  // Not Reachable (many)
  ...generateNotReachableLeads(),
];

function generateNotReachableLeads(): Lead[] {
  const names = [
    "Andrei Popov", "Katerina Savvides", "Michael Brown", "Olga Ivanova",
    "Christos Demetriou", "Natalia Petrova", "David Williams", "Sophia Georgiades",
    "Viktor Smirnov", "Andreas Loizou", "Tatiana Kozlova", "Paul Johnson",
    "Marina Alexandrova", "Panayiotis Kyriacou", "Ekaterina Novikova",
    "Thomas Wilson", "Yiannis Charalambous", "Oksana Morozova", "Chris Taylor",
    "Nadia Fedorova", "Kostas Michail", "Vera Stepanova", "Robert Anderson",
    "Eleni Ioannou", "Sergei Volkov", "Mark Davies", "Despina Christofi",
  ];
  const cities = ["Limassol", "Limassol", "Limassol", "Paphos", "Limassol"];
  const interests = ["2-bed apartment", "Villa", "Penthouse", "1-bed apartment", "Townhouse", "Studio"];
  const agents = ["Nikos Andreou", "Maria Georgiou", "Elena Papadopoulou"];
  const sources = ["Facebook Ads", "Bazaraki", "Google Ads", "Website"];

  return names.map((name, i) => ({
    id: `L${100 + i}`,
    name,
    phone: `+357 ${90 + (i % 10)}${String(1000000 + i * 37).slice(0, 7)}`,
    status: "not_reachable" as LeadStatus,
    dealType: (i % 4 === 0 ? "rent" : "sale") as DealType,
    city: cities[i % cities.length],
    interest: interests[i % interests.length],
    budget: i % 4 === 0 ? `€${800 + i * 50}/mo` : `€${150 + i * 15},000`,
    agent: agents[i % agents.length],
    source: sources[i % sources.length],
    lastFollowUp: `2025-${String(10 + (i % 3)).padStart(2, "0")}-${String(5 + (i % 25)).padStart(2, "0")}`,
    daysInactive: 60 + i * 3,
    contactDate: `2026-03-${String(15 + (i % 3)).padStart(2, "0")}`,
    contactChannel: (i % 3 === 0 ? "voice" : "whatsapp") as Channel,
    crmUpdated: true,
  }));
}

// === AUTOMATIONS ===
export const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: "A001",
    name: "Sale Leads — Limassol",
    status: "active",
    dealType: "sale",
    city: "Limassol",
    channel: "WA → Voice",
    schedule: "Daily",
    waTime: "09:30",
    voiceWindow: "17:00–20:00",
    batchSize: 30,
    statuses: ["Contact Made", "Sleep"],
    inactivityDays: 60,
    matchingLeads: 142,
    totalProcessed: 87,
    totalInterested: 12,
    lastRun: "Today 09:30",
    nextRun: "Tomorrow 09:30",
    runs: [
      { date: "Mar 17", leadsQueued: 28, contacted: 22, interested: 3, callback: 1, notInterested: 4, notReachable: 14, errors: 0 },
      { date: "Mar 16", leadsQueued: 30, contacted: 24, interested: 4, callback: 2, notInterested: 5, notReachable: 13, errors: 0 },
      { date: "Mar 14", leadsQueued: 30, contacted: 19, interested: 2, callback: 0, notInterested: 3, notReachable: 14, errors: 1 },
      { date: "Mar 13", leadsQueued: 30, contacted: 25, interested: 3, callback: 1, notInterested: 6, notReachable: 15, errors: 0 },
    ],
  },
  {
    id: "A002",
    name: "Rental Leads — Limassol",
    status: "paused",
    dealType: "rent",
    city: "Limassol",
    channel: "WA → Voice",
    schedule: "Daily",
    waTime: "09:30",
    voiceWindow: "17:00–20:00",
    batchSize: 20,
    statuses: ["Contact Made"],
    inactivityDays: 14,
    matchingLeads: 89,
    totalProcessed: 24,
    totalInterested: 2,
    lastRun: "Mar 15",
    runs: [
      { date: "Mar 15", leadsQueued: 24, contacted: 18, interested: 2, callback: 1, notInterested: 3, notReachable: 12, errors: 0 },
    ],
  },
];

// === DASHBOARD STATS ===
export const DASHBOARD_STATS = {
  totalDormantSale: 158,
  totalDormantRent: 89,
  totalDormant: 247,
  processed: 87,
  contacted: 56,
  interested: 12,
  callbackLater: 4,
  notInterested: 15,
  notReachable: 56,
  successRate: 13.8,
  waSent: 87,
  waReplied: 18,
  waReplyRate: 20.7,
  waQualified: 14,
  waQualRate: 77.8,
  voiceCalls: 69,
  voiceAnswered: 16,
  voiceAnswerRate: 23.2,
  voiceQualified: 2,
  voiceQualRate: 12.5,
};

// === HELPER ===
export function getLeadsByStatus(status: LeadStatus): Lead[] {
  return MOCK_LEADS.filter(l => l.status === status);
}

export function getLeadById(id: string): Lead | undefined {
  return MOCK_LEADS.find(l => l.id === id);
}
