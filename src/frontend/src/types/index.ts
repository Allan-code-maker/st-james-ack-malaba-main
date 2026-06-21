// ─── Core Church Types — aligned with the Node.js/Firestore backend ────────

export interface Hymn {
  id: string;
  number: number;
  title: string;
  lyrics: string;
  createdAt: number;
}

export interface BibleReading {
  id: string;
  reference: string;
  text: string;
  isReadingOfDay: boolean;
  createdAt: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: number;
}

export interface Sermon {
  id: string;
  preacher: string;
  theme: string;
  date: number;
  scriptureRef: string;
  notes: string;
  createdAt: number;
}

export interface ProgramItem {
  id: string;
  order: number;
  time: string;
  activity: string;
  createdAt: number;
}

export interface Class {
  id: string;
  name: string;
  teacher: string;
  description: string;
  schedule: string;
  createdAt: number;
}

export interface LectureMaterial {
  id: string;
  classId: string;
  title: string;
  fileName: string;
  uploadedAt: number;
}

export interface YouthItem {
  id: string;
  title: string;
  description: string;
  date?: number;
  leader: string;
  category: string;
  createdAt: number;
}

export interface MothersItem {
  id: string;
  title: string;
  description: string;
  date?: number;
  leader: string;
  category: string;
  createdAt: number;
}

export interface MensItem {
  id: string;
  title: string;
  description: string;
  date?: number;
  leader: string;
  category: string;
  createdAt: number;
}

export interface OfferingInfo {
  mpesaNumber: string;
  mpesaName: string;
  bankName: string;
  bankAccount: string;
  bankBranch: string;
  instructions: string;
}

export interface ServiceBookItem {
  id: string;
  title: string;
  content: string;
  step: number;
  createdAt: number;
}

// ─── Section Metadata ─────────────────────────────────────────────────────

export interface SectionMeta {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  color: "primary" | "secondary" | "accent";
  badge?: string;
}
