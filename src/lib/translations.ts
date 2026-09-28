export type Language = "en" | "bn";

export interface TranslationDict {
  appName: string;
  assistantTitle: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingNight: string;
  greetingUser: string;
  readyStatus: string;
  energy: string;
  freeModeTitle: string;
  freeModeDesc: string;
  activate: string;
  howCanIHelp: string;
  listeningStatus: string;
  speakingStatus: string;
  processingStatus: string;
  music: string;
  study: string;
  journal: string;
  weather: string;
  today: string;
  mood: string;
  warm: string;
  allGood: string;
  askPlaceholder: string;
  homeTab: string;
  scanTab: string;
  memoriesTab: string;
  chatTab: string;
  screenVision: string;
  screenVisionActive: string;
  screenVisionPaused: string;
  startScreenVision: string;
  stopScreenVision: string;
  screenVisionPrompt: string;
  settings: string;
  privacyAudit: string;
  notifications: string;
  phoneControl: string;
  actionHistory: string;
  healthDiagnostics: string;
  edgeLighting: string;
  voiceGuardian: string;
  pcSync: string;
  offlineMode: string;
  language: string;
  english: string;
  bangla: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    appName: "MAYRA AI",
    assistantTitle: "Maya",
    greetingMorning: "Good morning,",
    greetingAfternoon: "Good afternoon,",
    greetingNight: "Good night,",
    greetingUser: "there",
    readyStatus: "Maya is ready to help you.",
    energy: "Energy",
    freeModeTitle: "Free mode • 8:00 min left today",
    freeModeDesc: "Activate a license for tools, PC link and unlimited talk",
    activate: "Activate",
    howCanIHelp: "HOW CAN I HELP YOU?",
    listeningStatus: "Listening...",
    speakingStatus: "Maya is speaking...",
    processingStatus: "Thinking...",
    music: "Music",
    study: "Study",
    journal: "Journal",
    weather: "Weather",
    today: "Today",
    mood: "Mood",
    warm: "Warm",
    allGood: "All good",
    askPlaceholder: "Ask Maya anything...",
    homeTab: "Home",
    scanTab: "Scan",
    memoriesTab: "Memories",
    chatTab: "Chat",
    screenVision: "Screen Vision",
    screenVisionActive: "SCREEN VISION ACTIVE",
    screenVisionPaused: "SCREEN VISION PAUSED",
    startScreenVision: "Share Screen Vision",
    stopScreenVision: "Stop Screen",
    screenVisionPrompt: "Ask Maya what is on your screen",
    settings: "Settings",
    privacyAudit: "Privacy & Permissions",
    notifications: "Notifications",
    phoneControl: "Phone Control",
    actionHistory: "Action History & Health",
    healthDiagnostics: "System Diagnostics",
    edgeLighting: "RGB Edge Lighting",
    voiceGuardian: "Voice Guardian & Security",
    pcSync: "PC Sync & Pairing",
    offlineMode: "Offline Mode",
    language: "Language",
    english: "English",
    bangla: "বাংলা (Bangla)"
  },
  bn: {
    appName: "মায়রা এআই",
    assistantTitle: "মায়া",
    greetingMorning: "শুভ সকাল,",
    greetingAfternoon: "শুভ অপরাহ্ন,",
    greetingNight: "শুভ রাত্রি,",
    greetingUser: "বন্ধু",
    readyStatus: "মায়া আপনাকে সাহায্য করার জন্য প্রস্তুত।",
    energy: "শক্তি",
    freeModeTitle: "ফ্রি মোড • আজ ৮:০০ মিনিট বাকি",
    freeModeDesc: "টুলস, পিসি লিংক এবং আনলিমিটেড কথার জন্য লাইসেন্স সক্রিয় করুন",
    activate: "সক্রিয় করুন",
    howCanIHelp: "আমি কিভাবে সাহায্য করতে পারি?",
    listeningStatus: "শুনছি...",
    speakingStatus: "মায়া কথা বলছে...",
    processingStatus: "ভাবছি...",
    music: "গান",
    study: "পড়াশোনা",
    journal: "ডায়েরি",
    weather: "আবহাওয়া",
    today: "আজকের দিন",
    mood: "অনুভূতি",
    warm: "উষ্ণ",
    allGood: "সব ঠিক আছে",
    askPlaceholder: "মায়াকে যেকোনো প্রশ্ন করুন...",
    homeTab: "হোম",
    scanTab: "স্ক্যান",
    memoriesTab: "স্মৃতি",
    chatTab: "চ্যাট",
    screenVision: "স্ক্রিন ভিশন",
    screenVisionActive: "স্ক্রিন ভিশন সক্রিয় আছে",
    screenVisionPaused: "স্ক্রিন ভিশন সাময়িক বন্ধ",
    startScreenVision: "স্ক্রিন শেয়ার শুরু করুন",
    stopScreenVision: "স্ক্রিন বন্ধ করুন",
    screenVisionPrompt: "স্ক্রিনে কী আছে মায়াকে জিজ্ঞেস করুন",
    settings: "সেটিংস",
    privacyAudit: "গোপনীয়তা ও পারমিশন",
    notifications: "নোটিফিকেশন",
    phoneControl: "ফোন কন্ট্রোল",
    actionHistory: "কাজের ইতিহাস ও স্বাস্থ্য",
    healthDiagnostics: "সিস্টেম ডায়াগনস্টিক",
    edgeLighting: "আরজিবি এজ লাইটিং",
    voiceGuardian: "ভয়েস গার্ডিয়ান ও নিরাপত্তা",
    pcSync: "পিসি সিঙ্ক ও পেয়ারিং",
    offlineMode: "অফলাইন মোড",
    language: "ভাষা",
    english: "English",
    bangla: "বাংলা (Bangla)"
  }
};
