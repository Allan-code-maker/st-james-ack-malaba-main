import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Sermon {
    id: Id;
    preacher: string;
    theme: string;
    scriptureRef: string;
    date: Timestamp;
    createdAt: Timestamp;
    notes: string;
}
export interface Class {
    id: Id;
    name: string;
    createdAt: Timestamp;
    teacher: string;
    description: string;
    schedule: string;
}
export type Timestamp = bigint;
export interface HymnInput {
    title: string;
    lyrics: string;
    number: bigint;
}
export interface YouthItem {
    id: Id;
    title: string;
    date?: Timestamp;
    createdAt: Timestamp;
    description: string;
    leader: string;
    category: string;
}
export interface LectureMaterial {
    id: Id;
    title: string;
    file: ExternalBlob;
    fileName: string;
    classId: Id;
    uploadedAt: Timestamp;
}
export interface SermonInput {
    preacher: string;
    theme: string;
    scriptureRef: string;
    date: Timestamp;
    notes: string;
}
export interface ProgramItem {
    id: Id;
    order: bigint;
    createdAt: Timestamp;
    time: string;
    activity: string;
}
export interface YouthItemInput {
    title: string;
    date?: Timestamp;
    description: string;
    leader: string;
    category: string;
}
export interface Hymn {
    id: Id;
    title: string;
    lyrics: string;
    createdAt: Timestamp;
    number: bigint;
}
export interface ServiceBookItemInput {
    title: string;
    content: string;
    step: bigint;
}
export interface ServiceBookItem {
    id: Id;
    title: string;
    content: string;
    createdAt: Timestamp;
    step: bigint;
}
export interface BibleReadingInput {
    text: string;
    reference: string;
}
export interface Announcement {
    id: Id;
    title: string;
    body: string;
    createdAt: Timestamp;
    pinned: boolean;
}
export interface ClassInput {
    name: string;
    teacher: string;
    description: string;
    schedule: string;
}
export interface ProgramItemInput {
    order: bigint;
    time: string;
    activity: string;
}
export interface LectureMaterialInput {
    title: string;
    file: ExternalBlob;
    fileName: string;
    classId: Id;
}
export interface MothersItem {
    id: Id;
    title: string;
    date?: Timestamp;
    createdAt: Timestamp;
    description: string;
    leader: string;
    category: string;
}
export interface MensItemInput {
    title: string;
    date?: Timestamp;
    description: string;
    leader: string;
    category: string;
}
export interface BibleReading {
    id: Id;
    createdAt: Timestamp;
    text: string;
    reference: string;
    isReadingOfDay: boolean;
}
export interface OfferingInfo {
    bankAccount: string;
    mpesaName: string;
    instructions: string;
    bankName: string;
    mpesaNumber: string;
    bankBranch: string;
}
export interface AnnouncementInput {
    title: string;
    body: string;
    pinned: boolean;
}
export type Id = bigint;
export interface MothersItemInput {
    title: string;
    date?: Timestamp;
    description: string;
    leader: string;
    category: string;
}
export interface MensItem {
    id: Id;
    title: string;
    date?: Timestamp;
    createdAt: Timestamp;
    description: string;
    leader: string;
    category: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAnnouncement(input: AnnouncementInput): Promise<Announcement>;
    addBibleReading(input: BibleReadingInput): Promise<BibleReading>;
    addClass(input: ClassInput): Promise<Class>;
    addHymn(input: HymnInput): Promise<Hymn>;
    addLectureMaterial(input: LectureMaterialInput): Promise<LectureMaterial>;
    addMensItem(input: MensItemInput): Promise<MensItem>;
    addMothersItem(input: MothersItemInput): Promise<MothersItem>;
    addProgramItem(input: ProgramItemInput): Promise<ProgramItem>;
    addSermon(input: SermonInput): Promise<Sermon>;
    addServiceBookItem(input: ServiceBookItemInput): Promise<ServiceBookItem>;
    addYouthItem(input: YouthItemInput): Promise<YouthItem>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAnnouncement(id: Id): Promise<boolean>;
    deleteBibleReading(id: Id): Promise<boolean>;
    deleteClass(id: Id): Promise<boolean>;
    deleteHymn(id: Id): Promise<boolean>;
    deleteLectureMaterial(id: Id): Promise<boolean>;
    deleteMensItem(id: Id): Promise<boolean>;
    deleteMothersItem(id: Id): Promise<boolean>;
    deleteProgramItem(id: Id): Promise<boolean>;
    deleteSermon(id: Id): Promise<boolean>;
    deleteServiceBookItem(id: Id): Promise<boolean>;
    deleteYouthItem(id: Id): Promise<boolean>;
    getAnnouncement(id: Id): Promise<Announcement | null>;
    getBibleReading(id: Id): Promise<BibleReading | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClass(id: Id): Promise<Class | null>;
    getHymn(id: Id): Promise<Hymn | null>;
    getMensItem(id: Id): Promise<MensItem | null>;
    getMothersItem(id: Id): Promise<MothersItem | null>;
    getOfferingInfo(): Promise<OfferingInfo | null>;
    getProgramItem(id: Id): Promise<ProgramItem | null>;
    getSermon(id: Id): Promise<Sermon | null>;
    getYouthItem(id: Id): Promise<YouthItem | null>;
    isCallerAdmin(): Promise<boolean>;
    listAnnouncements(): Promise<Array<Announcement>>;
    listBibleReadings(): Promise<Array<BibleReading>>;
    listClasses(): Promise<Array<Class>>;
    listHymns(): Promise<Array<Hymn>>;
    listLectureMaterials(classId: Id): Promise<Array<LectureMaterial>>;
    listMensItems(): Promise<Array<MensItem>>;
    listMothersItems(): Promise<Array<MothersItem>>;
    listProgramItems(): Promise<Array<ProgramItem>>;
    listSermons(): Promise<Array<Sermon>>;
    listServiceBookItems(): Promise<Array<ServiceBookItem>>;
    listYouthItems(): Promise<Array<YouthItem>>;
    searchHymns(searchQuery: string): Promise<Array<Hymn>>;
    setReadingOfDay(id: Id): Promise<boolean>;
    updateAnnouncement(id: Id, input: AnnouncementInput): Promise<Announcement | null>;
    updateBibleReading(id: Id, input: BibleReadingInput): Promise<BibleReading | null>;
    updateClass(id: Id, input: ClassInput): Promise<Class | null>;
    updateHymn(id: Id, input: HymnInput): Promise<Hymn | null>;
    updateMensItem(id: Id, input: MensItemInput): Promise<MensItem | null>;
    updateMothersItem(id: Id, input: MothersItemInput): Promise<MothersItem | null>;
    updateOfferingInfo(info: OfferingInfo): Promise<void>;
    updateProgramItem(id: Id, input: ProgramItemInput): Promise<ProgramItem | null>;
    updateSermon(id: Id, input: SermonInput): Promise<Sermon | null>;
    updateServiceBookItem(id: Id, input: ServiceBookItemInput): Promise<ServiceBookItem | null>;
    updateYouthItem(id: Id, input: YouthItemInput): Promise<YouthItem | null>;
}
