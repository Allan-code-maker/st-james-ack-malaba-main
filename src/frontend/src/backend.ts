import { Actor, HttpAgent, type HttpAgentOptions, type ActorConfig, type Agent, type ActorSubclass } from "@icp-sdk/core/agent";
import type { Principal } from "@icp-sdk/core/principal";
import { idlFactory, type _SERVICE } from "./declarations/backend.did";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
function some<T>(value: T): Some<T> {
    return {
        __kind__: "Some",
        value: value
    };
}
function none(): None {
    return {
        __kind__: "None"
    };
}
function isNone<T>(option: Option<T>): option is None {
    return option.__kind__ === "None";
}
function isSome<T>(option: Option<T>): option is Some<T> {
    return option.__kind__ === "Some";
}
function unwrap<T>(option: Option<T>): T {
    if (isNone(option)) {
        throw new Error("unwrap: none");
    }
    return option.value;
}
function candid_some<T>(value: T): [T] {
    return [
        value
    ];
}
function candid_none<T>(): [] {
    return [];
}
function record_opt_to_undefined<T>(arg: T | null): T | undefined {
    return arg == null ? undefined : arg;
}
export class ExternalBlob {
    _blob?: Uint8Array<ArrayBuffer> | null;
    directURL: string;
    onProgress?: (percentage: number) => void = undefined;
    private constructor(directURL: string, blob: Uint8Array<ArrayBuffer> | null){
        if (blob) {
            this._blob = blob;
        }
        this.directURL = directURL;
    }
    static fromURL(url: string): ExternalBlob {
        return new ExternalBlob(url, null);
    }
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob {
        const url = URL.createObjectURL(new Blob([
            new Uint8Array(blob)
        ], {
            type: 'application/octet-stream'
        }));
        return new ExternalBlob(url, blob);
    }
    public async getBytes(): Promise<Uint8Array<ArrayBuffer>> {
        if (this._blob) {
            return this._blob;
        }
        const response = await fetch(this.directURL);
        const blob = await response.blob();
        this._blob = new Uint8Array(await blob.arrayBuffer());
        return this._blob;
    }
    public getDirectURL(): string {
        return this.directURL;
    }
    public withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob {
        this.onProgress = onProgress;
        return this;
    }
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
export interface _ImmutableObjectStorageRefillResult {
    success?: boolean;
    topped_up_amount?: bigint;
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
export interface _ImmutableObjectStorageRefillInformation {
    proposed_top_up_amount?: bigint;
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
export interface _ImmutableObjectStorageCreateCertificateResult {
    method: string;
    blob_hash: string;
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
    _immutableObjectStorageBlobsAreLive(hashes: Array<Uint8Array>): Promise<Array<boolean>>;
    _immutableObjectStorageBlobsToDelete(): Promise<Array<Uint8Array>>;
    _immutableObjectStorageConfirmBlobDeletion(blobs: Array<Uint8Array>): Promise<void>;
    _immutableObjectStorageCreateCertificate(blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult>;
    _immutableObjectStorageRefillCashier(refillInformation: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult>;
    _immutableObjectStorageUpdateGatewayPrincipals(): Promise<void>;
    _initializeAccessControl(): Promise<void>;
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
import type { Announcement as _Announcement, BibleReading as _BibleReading, Class as _Class, ExternalBlob as _ExternalBlob, Hymn as _Hymn, Id as _Id, LectureMaterial as _LectureMaterial, LectureMaterialInput as _LectureMaterialInput, MensItem as _MensItem, MensItemInput as _MensItemInput, MothersItem as _MothersItem, MothersItemInput as _MothersItemInput, OfferingInfo as _OfferingInfo, ProgramItem as _ProgramItem, Sermon as _Sermon, ServiceBookItem as _ServiceBookItem, Timestamp as _Timestamp, UserRole as _UserRole, YouthItem as _YouthItem, YouthItemInput as _YouthItemInput, _ImmutableObjectStorageRefillInformation as __ImmutableObjectStorageRefillInformation, _ImmutableObjectStorageRefillResult as __ImmutableObjectStorageRefillResult } from "./declarations/backend.did.d.ts";
export class Backend implements backendInterface {
    constructor(private actor: ActorSubclass<_SERVICE>, private _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, private _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, private processError?: (error: unknown) => never){}
    async _immutableObjectStorageBlobsAreLive(arg0: Array<Uint8Array>): Promise<Array<boolean>> {
        if (this.processError) {
            try {
                const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
            return result;
        }
    }
    async _immutableObjectStorageBlobsToDelete(): Promise<Array<Uint8Array>> {
        if (this.processError) {
            try {
                const result = await this.actor._immutableObjectStorageBlobsToDelete();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor._immutableObjectStorageBlobsToDelete();
            return result;
        }
    }
    async _immutableObjectStorageConfirmBlobDeletion(arg0: Array<Uint8Array>): Promise<void> {
        if (this.processError) {
            try {
                const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
            return result;
        }
    }
    async _immutableObjectStorageCreateCertificate(arg0: string): Promise<_ImmutableObjectStorageCreateCertificateResult> {
        if (this.processError) {
            try {
                const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
            return result;
        }
    }
    async _immutableObjectStorageRefillCashier(arg0: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> {
        if (this.processError) {
            try {
                const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
                return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
            return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
        }
    }
    async _immutableObjectStorageUpdateGatewayPrincipals(): Promise<void> {
        if (this.processError) {
            try {
                const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
            return result;
        }
    }
    async _initializeAccessControl(): Promise<void> {
        if (this.processError) {
            try {
                const result = await this.actor._initializeAccessControl();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor._initializeAccessControl();
            return result;
        }
    }
    async addAnnouncement(arg0: AnnouncementInput): Promise<Announcement> {
        if (this.processError) {
            try {
                const result = await this.actor.addAnnouncement(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addAnnouncement(arg0);
            return result;
        }
    }
    async addBibleReading(arg0: BibleReadingInput): Promise<BibleReading> {
        if (this.processError) {
            try {
                const result = await this.actor.addBibleReading(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addBibleReading(arg0);
            return result;
        }
    }
    async addClass(arg0: ClassInput): Promise<Class> {
        if (this.processError) {
            try {
                const result = await this.actor.addClass(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addClass(arg0);
            return result;
        }
    }
    async addHymn(arg0: HymnInput): Promise<Hymn> {
        if (this.processError) {
            try {
                const result = await this.actor.addHymn(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addHymn(arg0);
            return result;
        }
    }
    async addLectureMaterial(arg0: LectureMaterialInput): Promise<LectureMaterial> {
        if (this.processError) {
            try {
                const result = await this.actor.addLectureMaterial(await to_candid_LectureMaterialInput_n8(this._uploadFile, this._downloadFile, arg0));
                return from_candid_LectureMaterial_n11(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addLectureMaterial(await to_candid_LectureMaterialInput_n8(this._uploadFile, this._downloadFile, arg0));
            return from_candid_LectureMaterial_n11(this._uploadFile, this._downloadFile, result);
        }
    }
    async addMensItem(arg0: MensItemInput): Promise<MensItem> {
        if (this.processError) {
            try {
                const result = await this.actor.addMensItem(to_candid_MensItemInput_n14(this._uploadFile, this._downloadFile, arg0));
                return from_candid_MensItem_n16(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addMensItem(to_candid_MensItemInput_n14(this._uploadFile, this._downloadFile, arg0));
            return from_candid_MensItem_n16(this._uploadFile, this._downloadFile, result);
        }
    }
    async addMothersItem(arg0: MothersItemInput): Promise<MothersItem> {
        if (this.processError) {
            try {
                const result = await this.actor.addMothersItem(to_candid_MothersItemInput_n19(this._uploadFile, this._downloadFile, arg0));
                return from_candid_MothersItem_n20(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addMothersItem(to_candid_MothersItemInput_n19(this._uploadFile, this._downloadFile, arg0));
            return from_candid_MothersItem_n20(this._uploadFile, this._downloadFile, result);
        }
    }
    async addProgramItem(arg0: ProgramItemInput): Promise<ProgramItem> {
        if (this.processError) {
            try {
                const result = await this.actor.addProgramItem(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addProgramItem(arg0);
            return result;
        }
    }
    async addSermon(arg0: SermonInput): Promise<Sermon> {
        if (this.processError) {
            try {
                const result = await this.actor.addSermon(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addSermon(arg0);
            return result;
        }
    }
    async addServiceBookItem(arg0: ServiceBookItemInput): Promise<ServiceBookItem> {
        if (this.processError) {
            try {
                const result = await this.actor.addServiceBookItem(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addServiceBookItem(arg0);
            return result;
        }
    }
    async addYouthItem(arg0: YouthItemInput): Promise<YouthItem> {
        if (this.processError) {
            try {
                const result = await this.actor.addYouthItem(to_candid_YouthItemInput_n21(this._uploadFile, this._downloadFile, arg0));
                return from_candid_YouthItem_n22(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.addYouthItem(to_candid_YouthItemInput_n21(this._uploadFile, this._downloadFile, arg0));
            return from_candid_YouthItem_n22(this._uploadFile, this._downloadFile, result);
        }
    }
    async assignCallerUserRole(arg0: Principal, arg1: UserRole): Promise<void> {
        if (this.processError) {
            try {
                const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n23(this._uploadFile, this._downloadFile, arg1));
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n23(this._uploadFile, this._downloadFile, arg1));
            return result;
        }
    }
    async deleteAnnouncement(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteAnnouncement(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteAnnouncement(arg0);
            return result;
        }
    }
    async deleteBibleReading(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteBibleReading(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteBibleReading(arg0);
            return result;
        }
    }
    async deleteClass(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteClass(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteClass(arg0);
            return result;
        }
    }
    async deleteHymn(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteHymn(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteHymn(arg0);
            return result;
        }
    }
    async deleteLectureMaterial(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteLectureMaterial(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteLectureMaterial(arg0);
            return result;
        }
    }
    async deleteMensItem(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteMensItem(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteMensItem(arg0);
            return result;
        }
    }
    async deleteMothersItem(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteMothersItem(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteMothersItem(arg0);
            return result;
        }
    }
    async deleteProgramItem(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteProgramItem(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteProgramItem(arg0);
            return result;
        }
    }
    async deleteSermon(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteSermon(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteSermon(arg0);
            return result;
        }
    }
    async deleteServiceBookItem(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteServiceBookItem(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteServiceBookItem(arg0);
            return result;
        }
    }
    async deleteYouthItem(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.deleteYouthItem(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.deleteYouthItem(arg0);
            return result;
        }
    }
    async getAnnouncement(arg0: Id): Promise<Announcement | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getAnnouncement(arg0);
                return from_candid_opt_n25(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getAnnouncement(arg0);
            return from_candid_opt_n25(this._uploadFile, this._downloadFile, result);
        }
    }
    async getBibleReading(arg0: Id): Promise<BibleReading | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getBibleReading(arg0);
                return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getBibleReading(arg0);
            return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
        }
    }
    async getCallerUserRole(): Promise<UserRole> {
        if (this.processError) {
            try {
                const result = await this.actor.getCallerUserRole();
                return from_candid_UserRole_n27(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getCallerUserRole();
            return from_candid_UserRole_n27(this._uploadFile, this._downloadFile, result);
        }
    }
    async getClass(arg0: Id): Promise<Class | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getClass(arg0);
                return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getClass(arg0);
            return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
        }
    }
    async getHymn(arg0: Id): Promise<Hymn | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getHymn(arg0);
                return from_candid_opt_n30(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getHymn(arg0);
            return from_candid_opt_n30(this._uploadFile, this._downloadFile, result);
        }
    }
    async getMensItem(arg0: Id): Promise<MensItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getMensItem(arg0);
                return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getMensItem(arg0);
            return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
        }
    }
    async getMothersItem(arg0: Id): Promise<MothersItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getMothersItem(arg0);
                return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getMothersItem(arg0);
            return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
        }
    }
    async getOfferingInfo(): Promise<OfferingInfo | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getOfferingInfo();
                return from_candid_opt_n33(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getOfferingInfo();
            return from_candid_opt_n33(this._uploadFile, this._downloadFile, result);
        }
    }
    async getProgramItem(arg0: Id): Promise<ProgramItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getProgramItem(arg0);
                return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getProgramItem(arg0);
            return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
        }
    }
    async getSermon(arg0: Id): Promise<Sermon | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getSermon(arg0);
                return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getSermon(arg0);
            return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
        }
    }
    async getYouthItem(arg0: Id): Promise<YouthItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.getYouthItem(arg0);
                return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.getYouthItem(arg0);
            return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
        }
    }
    async isCallerAdmin(): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.isCallerAdmin();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.isCallerAdmin();
            return result;
        }
    }
    async listAnnouncements(): Promise<Array<Announcement>> {
        if (this.processError) {
            try {
                const result = await this.actor.listAnnouncements();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listAnnouncements();
            return result;
        }
    }
    async listBibleReadings(): Promise<Array<BibleReading>> {
        if (this.processError) {
            try {
                const result = await this.actor.listBibleReadings();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listBibleReadings();
            return result;
        }
    }
    async listClasses(): Promise<Array<Class>> {
        if (this.processError) {
            try {
                const result = await this.actor.listClasses();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listClasses();
            return result;
        }
    }
    async listHymns(): Promise<Array<Hymn>> {
        if (this.processError) {
            try {
                const result = await this.actor.listHymns();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listHymns();
            return result;
        }
    }
    async listLectureMaterials(arg0: Id): Promise<Array<LectureMaterial>> {
        if (this.processError) {
            try {
                const result = await this.actor.listLectureMaterials(arg0);
                return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listLectureMaterials(arg0);
            return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
        }
    }
    async listMensItems(): Promise<Array<MensItem>> {
        if (this.processError) {
            try {
                const result = await this.actor.listMensItems();
                return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listMensItems();
            return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
        }
    }
    async listMothersItems(): Promise<Array<MothersItem>> {
        if (this.processError) {
            try {
                const result = await this.actor.listMothersItems();
                return from_candid_vec_n39(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listMothersItems();
            return from_candid_vec_n39(this._uploadFile, this._downloadFile, result);
        }
    }
    async listProgramItems(): Promise<Array<ProgramItem>> {
        if (this.processError) {
            try {
                const result = await this.actor.listProgramItems();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listProgramItems();
            return result;
        }
    }
    async listSermons(): Promise<Array<Sermon>> {
        if (this.processError) {
            try {
                const result = await this.actor.listSermons();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listSermons();
            return result;
        }
    }
    async listServiceBookItems(): Promise<Array<ServiceBookItem>> {
        if (this.processError) {
            try {
                const result = await this.actor.listServiceBookItems();
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listServiceBookItems();
            return result;
        }
    }
    async listYouthItems(): Promise<Array<YouthItem>> {
        if (this.processError) {
            try {
                const result = await this.actor.listYouthItems();
                return from_candid_vec_n40(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.listYouthItems();
            return from_candid_vec_n40(this._uploadFile, this._downloadFile, result);
        }
    }
    async searchHymns(arg0: string): Promise<Array<Hymn>> {
        if (this.processError) {
            try {
                const result = await this.actor.searchHymns(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.searchHymns(arg0);
            return result;
        }
    }
    async setReadingOfDay(arg0: Id): Promise<boolean> {
        if (this.processError) {
            try {
                const result = await this.actor.setReadingOfDay(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.setReadingOfDay(arg0);
            return result;
        }
    }
    async updateAnnouncement(arg0: Id, arg1: AnnouncementInput): Promise<Announcement | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateAnnouncement(arg0, arg1);
                return from_candid_opt_n25(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateAnnouncement(arg0, arg1);
            return from_candid_opt_n25(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateBibleReading(arg0: Id, arg1: BibleReadingInput): Promise<BibleReading | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateBibleReading(arg0, arg1);
                return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateBibleReading(arg0, arg1);
            return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateClass(arg0: Id, arg1: ClassInput): Promise<Class | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateClass(arg0, arg1);
                return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateClass(arg0, arg1);
            return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateHymn(arg0: Id, arg1: HymnInput): Promise<Hymn | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateHymn(arg0, arg1);
                return from_candid_opt_n30(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateHymn(arg0, arg1);
            return from_candid_opt_n30(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateMensItem(arg0: Id, arg1: MensItemInput): Promise<MensItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateMensItem(arg0, to_candid_MensItemInput_n14(this._uploadFile, this._downloadFile, arg1));
                return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateMensItem(arg0, to_candid_MensItemInput_n14(this._uploadFile, this._downloadFile, arg1));
            return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateMothersItem(arg0: Id, arg1: MothersItemInput): Promise<MothersItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateMothersItem(arg0, to_candid_MothersItemInput_n19(this._uploadFile, this._downloadFile, arg1));
                return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateMothersItem(arg0, to_candid_MothersItemInput_n19(this._uploadFile, this._downloadFile, arg1));
            return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateOfferingInfo(arg0: OfferingInfo): Promise<void> {
        if (this.processError) {
            try {
                const result = await this.actor.updateOfferingInfo(arg0);
                return result;
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateOfferingInfo(arg0);
            return result;
        }
    }
    async updateProgramItem(arg0: Id, arg1: ProgramItemInput): Promise<ProgramItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateProgramItem(arg0, arg1);
                return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateProgramItem(arg0, arg1);
            return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateSermon(arg0: Id, arg1: SermonInput): Promise<Sermon | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateSermon(arg0, arg1);
                return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateSermon(arg0, arg1);
            return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateServiceBookItem(arg0: Id, arg1: ServiceBookItemInput): Promise<ServiceBookItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateServiceBookItem(arg0, arg1);
                return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateServiceBookItem(arg0, arg1);
            return from_candid_opt_n41(this._uploadFile, this._downloadFile, result);
        }
    }
    async updateYouthItem(arg0: Id, arg1: YouthItemInput): Promise<YouthItem | null> {
        if (this.processError) {
            try {
                const result = await this.actor.updateYouthItem(arg0, to_candid_YouthItemInput_n21(this._uploadFile, this._downloadFile, arg1));
                return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
            } catch (e) {
                this.processError(e);
                throw new Error("unreachable");
            }
        } else {
            const result = await this.actor.updateYouthItem(arg0, to_candid_YouthItemInput_n21(this._uploadFile, this._downloadFile, arg1));
            return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
        }
    }
}
async function from_candid_ExternalBlob_n13(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _ExternalBlob): Promise<ExternalBlob> {
    return await _downloadFile(value);
}
async function from_candid_LectureMaterial_n11(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _LectureMaterial): Promise<LectureMaterial> {
    return await from_candid_record_n12(_uploadFile, _downloadFile, value);
}
function from_candid_MensItem_n16(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _MensItem): MensItem {
    return from_candid_record_n17(_uploadFile, _downloadFile, value);
}
function from_candid_MothersItem_n20(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _MothersItem): MothersItem {
    return from_candid_record_n17(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n27(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _UserRole): UserRole {
    return from_candid_variant_n28(_uploadFile, _downloadFile, value);
}
function from_candid_YouthItem_n22(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _YouthItem): YouthItem {
    return from_candid_record_n17(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: __ImmutableObjectStorageRefillResult): _ImmutableObjectStorageRefillResult {
    return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n18(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_Timestamp]): Timestamp | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n25(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_Announcement]): Announcement | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n26(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_BibleReading]): BibleReading | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n29(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_Class]): Class | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n30(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_Hymn]): Hymn | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n31(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_MensItem]): MensItem | null {
    return value.length === 0 ? null : from_candid_MensItem_n16(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n32(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_MothersItem]): MothersItem | null {
    return value.length === 0 ? null : from_candid_MothersItem_n20(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n33(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_OfferingInfo]): OfferingInfo | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n34(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_ProgramItem]): ProgramItem | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n35(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_Sermon]): Sermon | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n36(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_YouthItem]): YouthItem | null {
    return value.length === 0 ? null : from_candid_YouthItem_n22(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n41(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [_ServiceBookItem]): ServiceBookItem | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n6(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [boolean]): boolean | null {
    return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: [] | [bigint]): bigint | null {
    return value.length === 0 ? null : value[0];
}
async function from_candid_record_n12(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    id: _Id;
    title: string;
    file: _ExternalBlob;
    fileName: string;
    classId: _Id;
    uploadedAt: _Timestamp;
}): Promise<{
    id: Id;
    title: string;
    file: ExternalBlob;
    fileName: string;
    classId: Id;
    uploadedAt: Timestamp;
}> {
    return {
        id: value.id,
        title: value.title,
        file: await from_candid_ExternalBlob_n13(_uploadFile, _downloadFile, value.file),
        fileName: value.fileName,
        classId: value.classId,
        uploadedAt: value.uploadedAt
    };
}
function from_candid_record_n17(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    id: _Id;
    title: string;
    date: [] | [_Timestamp];
    createdAt: _Timestamp;
    description: string;
    leader: string;
    category: string;
}): {
    id: Id;
    title: string;
    date?: Timestamp;
    createdAt: Timestamp;
    description: string;
    leader: string;
    category: string;
} {
    return {
        id: value.id,
        title: value.title,
        date: record_opt_to_undefined(from_candid_opt_n18(_uploadFile, _downloadFile, value.date)),
        createdAt: value.createdAt,
        description: value.description,
        leader: value.leader,
        category: value.category
    };
}
function from_candid_record_n5(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    success: [] | [boolean];
    topped_up_amount: [] | [bigint];
}): {
    success?: boolean;
    topped_up_amount?: bigint;
} {
    return {
        success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
        topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
    };
}
function from_candid_variant_n28(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    admin: null;
} | {
    user: null;
} | {
    guest: null;
}): UserRole {
    return "admin" in value ? UserRole.admin : "user" in value ? UserRole.user : "guest" in value ? UserRole.guest : value;
}
async function from_candid_vec_n37(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_LectureMaterial>): Promise<Array<LectureMaterial>> {
    return await Promise.all(value.map(async (x)=>await from_candid_LectureMaterial_n11(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n38(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_MensItem>): Array<MensItem> {
    return value.map((x)=>from_candid_MensItem_n16(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n39(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_MothersItem>): Array<MothersItem> {
    return value.map((x)=>from_candid_MothersItem_n20(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n40(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: Array<_YouthItem>): Array<YouthItem> {
    return value.map((x)=>from_candid_YouthItem_n22(_uploadFile, _downloadFile, x));
}
async function to_candid_ExternalBlob_n10(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: ExternalBlob): Promise<_ExternalBlob> {
    return await _uploadFile(value);
}
async function to_candid_LectureMaterialInput_n8(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: LectureMaterialInput): Promise<_LectureMaterialInput> {
    return await to_candid_record_n9(_uploadFile, _downloadFile, value);
}
function to_candid_MensItemInput_n14(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: MensItemInput): _MensItemInput {
    return to_candid_record_n15(_uploadFile, _downloadFile, value);
}
function to_candid_MothersItemInput_n19(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: MothersItemInput): _MothersItemInput {
    return to_candid_record_n15(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n23(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: UserRole): _UserRole {
    return to_candid_variant_n24(_uploadFile, _downloadFile, value);
}
function to_candid_YouthItemInput_n21(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: YouthItemInput): _YouthItemInput {
    return to_candid_record_n15(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _ImmutableObjectStorageRefillInformation): __ImmutableObjectStorageRefillInformation {
    return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: _ImmutableObjectStorageRefillInformation | null): [] | [__ImmutableObjectStorageRefillInformation] {
    return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_record_n15(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    title: string;
    date?: Timestamp;
    description: string;
    leader: string;
    category: string;
}): {
    title: string;
    date: [] | [_Timestamp];
    description: string;
    leader: string;
    category: string;
} {
    return {
        title: value.title,
        date: value.date ? candid_some(value.date) : candid_none(),
        description: value.description,
        leader: value.leader,
        category: value.category
    };
}
function to_candid_record_n3(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    proposed_top_up_amount?: bigint;
}): {
    proposed_top_up_amount: [] | [bigint];
} {
    return {
        proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
    };
}
async function to_candid_record_n9(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: {
    title: string;
    file: ExternalBlob;
    fileName: string;
    classId: Id;
}): Promise<{
    title: string;
    file: _ExternalBlob;
    fileName: string;
    classId: _Id;
}> {
    return {
        title: value.title,
        file: await to_candid_ExternalBlob_n10(_uploadFile, _downloadFile, value.file),
        fileName: value.fileName,
        classId: value.classId
    };
}
function to_candid_variant_n24(_uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, value: UserRole): {
    admin: null;
} | {
    user: null;
} | {
    guest: null;
} {
    return value == UserRole.admin ? {
        admin: null
    } : value == UserRole.user ? {
        user: null
    } : value == UserRole.guest ? {
        guest: null
    } : value;
}
export interface CreateActorOptions {
    agent?: Agent;
    agentOptions?: HttpAgentOptions;
    actorOptions?: ActorConfig;
    processError?: (error: unknown) => never;
}
export function createActor(canisterId: string, _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, options: CreateActorOptions = {}): Backend {
    const agent = options.agent || HttpAgent.createSync({
        ...options.agentOptions
    });
    if (options.agent && options.agentOptions) {
        console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
    }
    const actor = Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId: canisterId,
        ...options.actorOptions
    });
    return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
