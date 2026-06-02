import type { ExternalBlob } from "@/backend";

// ─── Core Church Types — aligned exactly with backend.d.ts ─────────────────

export type { ExternalBlob };

export interface Hymn {
  id: bigint;
  number: bigint;
  title: string;
  lyrics: string;
  createdAt: bigint;
}

export interface BibleReading {
  id: bigint;
  reference: string;
  text: string;
  isReadingOfDay: boolean;
  createdAt: bigint;
}

export interface Announcement {
  id: bigint;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: bigint;
}

export interface Sermon {
  id: bigint;
  preacher: string;
  theme: string;
  date: bigint;
  scriptureRef: string;
  notes: string;
  createdAt: bigint;
}

export interface ProgramItem {
  id: bigint;
  order: bigint;
  time: string;
  activity: string;
  createdAt: bigint;
}

export interface Class {
  id: bigint;
  name: string;
  teacher: string;
  description: string;
  schedule: string;
  createdAt: bigint;
}

export interface LectureMaterial {
  id: bigint;
  classId: bigint;
  title: string;
  file: ExternalBlob;
  fileName: string;
  uploadedAt: bigint;
}

export interface YouthItem {
  id: bigint;
  title: string;
  description: string;
  date?: bigint;
  leader: string;
  category: string;
  createdAt: bigint;
}

export interface MothersItem {
  id: bigint;
  title: string;
  description: string;
  date?: bigint;
  leader: string;
  category: string;
  createdAt: bigint;
}

export interface MensItem {
  id: bigint;
  title: string;
  description: string;
  date?: bigint;
  leader: string;
  category: string;
  createdAt: bigint;
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
  id: bigint;
  title: string;
  content: string;
  step: bigint;
  createdAt: bigint;
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
