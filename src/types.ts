export type CulturalStatus = 'verified' | 'needsReview' | 'illustration';

export interface CulturalImageAsset {
  id: string;
  src: string;
  mobileSrc?: string;
  alt: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
  culturalStatus: CulturalStatus;
  focalPoint?: { x: number; y: number };
  aspectRatio: '16:9' | '4:3' | '3:2' | '1:1' | '4:5' | 'A4-landscape';
}

export type StationId = 'residence' | 'guol' | 'weaving' | 'dance' | 'music' | 'speaking' | 'woodcraft' | 'dailylife';

export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  description: string;
  detailSnippet?: string;
  audioPronunciation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  culturalFact: string;
}

export interface FunFact {
  id: string;
  title: string;
  content: string;
  iconName: string;
  stationId: StationId;
  status: CulturalStatus;
  source: string;
}

export interface Station {
  id: StationId;
  order: number;
  title: string;
  subTitle: string;
  coTuTitle?: string;
  category: string;
  durationMinutes: number;
  summary: string;
  culturalSignificance: string;
  curriculumTieIn: string;
  imageId: string;
  stampId: string;
  stampName: string;
  stampColor: string;
  locationCoords: { x: number; y: number }; // percentage on map
  hotspots?: Hotspot[];
  storyDialogue: {
    speaker: string;
    avatar: string;
    role: string;
    text: string;
  }[];
  detailedSections: {
    title: string;
    content: string;
    bulletPoints?: string[];
  }[];
  quiz: QuizQuestion[];
  miniGameType?: 'weaving-sequence' | 'dance-rhythm' | 'gong-ensemble' | 'speaking-dialogue' | 'hotspot-explorer';
  funFacts: FunFact[];
  sources: {
    title: string;
    url: string;
  }[];
}

export interface Character {
  id: string;
  name: string;
  coTuName?: string;
  role: string;
  description: string;
  avatarSeed: string;
  greeting: string;
}

export interface Stamp {
  id: string;
  stationId: StationId;
  title: string;
  symbol: string;
  dateUnlocked?: string;
  description: string;
}

export interface UserProgress {
  studentName: string;
  schoolName: string;
  completedStations: StationId[];
  unlockedStamps: string[];
  score: number;
  visitedHotspots: string[];
  notebookNotes: { stationId: StationId; note: string; timestamp: string }[];
  certificateIssued: boolean;
  certificateCode?: string;
  completionDate?: string;
}
