// Mock data for Placy Re-engagement Prototype — Cyprus market

export type LeadStatus = "interested" | "callback_later" | "not_interested" | "not_reachable" | "pending" | "new" | "contacted" | "irrelevant";
export type Channel = "whatsapp" | "voice" | "email" | "both";
export type AutomationStatus = "active" | "paused" | "draft" | "complete";
export type DealType = "sale" | "rent";
export type LeadSource = "inbound" | "re-engagement";

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
  adSource: string;
  leadSource: LeadSource;
  lastFollowUp: string;
  daysInactive: number;
  aiSummary?: string;
  contactDate?: string;
  contactChannel?: Channel;
  conversation?: ConversationMessage[];
  crmUpdated?: boolean;
  humanNeeded?: boolean;
  refNumber?: string;
  property?: string;
  location?: string;
}

// Inbound conversations (from Conversations page pattern)
export interface Conversation {
  id: string;
  clientName: string;
  phone: string;
  channel: Channel;
  intent: DealType | "rent_out" | "irrelevant" | "not_detected";
  duration: string;
  summary: string;
  source: LeadSource;
  adSource?: string;
  humanNeeded: boolean;
  updatedAt: string;
  messages?: ConversationMessage[];
  leadCreated?: boolean;
  property?: string;
  location?: string;
  price?: string;
  refNumber?: string;
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
    adSource: "Facebook Ads",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Bazaraki",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Google Ads",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Website",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Facebook Ads",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Bazaraki",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Facebook Ads",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Google Ads",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: "Bazaraki",
    leadSource: "re-engagement" as LeadSource,
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
    adSource: sources[i % sources.length],
    leadSource: "re-engagement" as LeadSource,
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

// === HELPER: get leads by run date ===
export function getLeadsByRunDate(date: string): Lead[] {
  return MOCK_LEADS.filter(l => l.contactDate === date);
}

// Removed: INBOUND_LEADS (LQT not in this prototype)
// Kept for reference:
const _REMOVED_INBOUND_LEADS = [
  {
    id: "IL001",
    name: "Natallia Sharkova",
    phone: "+357 96 318 204",
    status: "contacted",
    dealType: "rent",
    city: "Limassol",
    interest: "3-bed apartment",
    budget: "€1,200/mo",
    agent: "Maria Georgiou",
    adSource: "Bazaraki",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    humanNeeded: true,
    refNumber: "#14316",
    property: "Apartment",
    location: "Limassol, Agios Dimitrios",
    aiSummary: "Interested in 3-bedroom apartment #14316 from Bazaraki. Family of 4 (husband + 2 sons), no pets. Available for viewing tomorrow. Requested agent follow-up.",
    contactDate: "2026-03-13",
    contactChannel: "whatsapp",
    conversation: [
      { sender: "lead", text: "Hi, I am interested in your advert on Bazaraki. bazaraki.com/adv/6130465 #14316", time: "10:18 PM" },
      { sender: "bot", text: "Good evening, Natallia! Thank you for reaching out to us at 4 Buy and Sell! Who will be living in the property, and do you have any special requirements?", time: "10:19 PM" },
      { sender: "lead", text: "Hi, we are considering it for ourselves: me, my husband and our 2 sons. Is it possible to view it somewhere tomorrow?", time: "10:20 PM" },
      { sender: "bot", text: "Thank you for sharing, Natallia! Could you also let me know if you have any pets?", time: "10:21 PM" },
      { sender: "lead", text: "No", time: "10:21 PM" },
    ],
  },
  {
    id: "IL002",
    name: "Anastasia Rasputina",
    phone: "+357 99 412 678",
    status: "contacted",
    dealType: "rent",
    city: "Limassol",
    interest: "4-bed house",
    budget: "€2,500/mo",
    agent: "Nikos Andreou",
    adSource: "Bazaraki",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    refNumber: "#18920",
    property: "House",
    location: "Limassol, Arcangelos",
    aiSummary: "Inquired about 4-bedroom house for rent in Arcangelos area. Budget up to €2,500. Moving from Nicosia.",
    contactDate: "2026-03-13",
    contactChannel: "voice",
  },
  {
    id: "IL003",
    name: "Belal Almasry",
    phone: "+357 96 555 321",
    status: "new",
    dealType: "rent",
    city: "Limassol",
    interest: "2-bed house",
    budget: "€1,400/mo",
    agent: "Elena Papadopoulou",
    adSource: "Bazaraki",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    property: "House",
    location: "Limassol, Germasogeia",
    aiSummary: "Interested in 2-bedroom detached house #14670. Family with kids. Looking for immediate move-in.",
    contactDate: "2026-03-13",
    contactChannel: "whatsapp",
    humanNeeded: true,
  },
  {
    id: "IL004",
    name: "Elena Petrova",
    phone: "+357 99 777 123",
    status: "contacted",
    dealType: "sale",
    city: "Limassol",
    interest: "Investment apartment",
    budget: "€250,000",
    agent: "Nikos Andreou",
    adSource: "Spitogatos",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    property: "Apartment",
    location: "Limassol, Agios Dimitrios",
    aiSummary: "Follow-up on investment apartments. Narrowed down to 2-bed in Agios Dimitrios. Budget €250K. Looking at ROI potential.",
    contactDate: "2026-03-13",
    contactChannel: "whatsapp",
  },
  {
    id: "IL005",
    name: "Andreas Papadopoulos",
    phone: "+357 96 482 731",
    status: "contacted",
    dealType: "rent",
    city: "Limassol",
    interest: "2-bed apartment",
    budget: "€1,400/mo",
    agent: "Maria Georgiou",
    adSource: "Bazaraki",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    humanNeeded: true,
    refNumber: "#82398",
    property: "Apartment",
    location: "Limassol, Neapolis",
    aiSummary: "Wants to rent a 2-bedroom apartment in Limassol. Family expecting a baby. Need 2-3 bedrooms with 2 toilets.",
    contactDate: "2026-03-13",
    contactChannel: "voice",
    conversation: [
      { sender: "bot", text: "Hello! Thank you for calling MySpace Real Estate. How can I help you today?", time: "7:38 PM" },
      { sender: "lead", text: "Hi, I'm looking for a 2 or 3 bedroom apartment in Limassol for rent. My wife is expecting so we need more space.", time: "7:38 PM" },
      { sender: "bot", text: "Congratulations! What area in Limassol do you prefer, and what's your budget range?", time: "7:39 PM" },
      { sender: "lead", text: "Neapolis or Mesa Geitonia. Budget up to 1400 euros. We need 2 toilets if possible.", time: "7:39 PM" },
      { sender: "bot", text: "Perfect. I'll have our agent Maria reach out to you with some suitable options. When would be a good time to call?", time: "7:40 PM" },
    ],
  },
  {
    id: "IL006",
    name: "James Wilson",
    phone: "+44 79 8765 4321",
    status: "contacted",
    dealType: "sale",
    city: "Limassol",
    interest: "Villa",
    budget: "€500,000",
    agent: "Nikos Andreou",
    adSource: "Google Ads",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    humanNeeded: true,
    property: "Villa",
    location: "Limassol",
    aiSummary: "UK buyer relocating to Cyprus. Looking for a villa with pool. Budget €500K. Ready to visit next month.",
    contactDate: "2026-03-13",
    contactChannel: "voice",
  },
  {
    id: "IL007",
    name: "Maria Ioannou",
    phone: "+357 99 222 456",
    status: "contacted",
    dealType: "sale",
    city: "Paphos",
    interest: "Family house",
    budget: "€350,000",
    agent: "Elena Papadopoulou",
    adSource: "Facebook Ads",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    property: "House",
    location: "Paphos, Kato Paphos",
    aiSummary: "Looking for a family house in Paphos. 3 bedrooms, garden. Budget around €350K.",
    contactDate: "2026-03-13",
    contactChannel: "whatsapp",
  },
  {
    id: "IL008",
    name: "Nikos Georgiou",
    phone: "+357 97 111 999",
    status: "irrelevant",
    dealType: "rent",
    city: "Limassol",
    interest: "",
    budget: "",
    agent: "",
    adSource: "Bazaraki",
    leadSource: "inbound",
    lastFollowUp: "2026-03-13",
    daysInactive: 4,
    aiSummary: "Called about a listing but wrong number. Not interested in property.",
    contactDate: "2026-03-13",
    contactChannel: "voice",
  },
];

// All leads = re-engagement only
export const ALL_LEADS: Lead[] = MOCK_LEADS;

// === CONVERSATIONS (re-engagement only) ===
export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: "C101", clientName: "Alexei Petrov", phone: "+357 99 456 789", channel: "whatsapp", intent: "sale", duration: "5 msgs", summary: "Re-engagement: Budget updated to €280K, ground floor with garden. Available next week.", source: "re-engagement", humanNeeded: false, updatedAt: "11:52 AM", leadCreated: true, property: "Apartment", location: "Limassol", price: "€280,000" },
  { id: "C102", clientName: "Elena Volkova", phone: "+357 96 812 345", channel: "whatsapp", intent: "sale", duration: "3 msgs", summary: "Re-engagement: Still looking for 2-bed in Germasogeia. 3-month timeline.", source: "re-engagement", humanNeeded: false, updatedAt: "10:15 AM", property: "Apartment", location: "Limassol", price: "€220,000" },
  { id: "C103", clientName: "James Smith", phone: "+44 79 1234 5678", channel: "voice", intent: "sale", duration: "2:15", summary: "Re-engagement: Wants villa €400-500K, relocating from UK. Ready to view.", source: "re-engagement", humanNeeded: false, updatedAt: "5:34 PM", property: "Villa", location: "Limassol", price: "€450,000" },
  { id: "C104", clientName: "Dmitry Sokolov", phone: "+7 905 123 4567", channel: "whatsapp", intent: "sale", duration: "4 msgs", summary: "Re-engagement: Still interested but not ready until June. Callback in May.", source: "re-engagement", humanNeeded: false, updatedAt: "9:45 AM", property: "Apartment", location: "Limassol", price: "€350,000" },
  { id: "C105", clientName: "George Papadopoulos", phone: "+357 96 111 222", channel: "whatsapp", intent: "not_detected", duration: "2 msgs", summary: "Re-engagement: Already purchased elsewhere. Not looking anymore.", source: "re-engagement", humanNeeded: false, updatedAt: "9:38 AM" },
];
