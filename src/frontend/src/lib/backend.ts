import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Hymn,
  BibleReading,
  Announcement,
  Sermon,
  ProgramItem,
  Class,
  LectureMaterial,
  YouthItem,
  MothersItem,
  MensItem,
  OfferingInfo,
  ServiceBookItem,
} from "@/types";

// Re-export input types from @/backend for use in forms
import type {
  HymnInput,
  BibleReadingInput,
  AnnouncementInput,
  SermonInput,
  ProgramItemInput,
  ClassInput,
  LectureMaterialInput,
  YouthItemInput,
  MothersItemInput,
  MensItemInput,
  ServiceBookItemInput,
} from "@/backend";
export type {
  HymnInput,
  BibleReadingInput,
  AnnouncementInput,
  SermonInput,
  ProgramItemInput,
  ClassInput,
  LectureMaterialInput,
  YouthItemInput,
  MothersItemInput,
  MensItemInput,
  ServiceBookItemInput,
} from "@/backend";

// ─── Hymns ────────────────────────────────────────────────────────────────

export function useHymns() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Hymn[]>({
    queryKey: ["hymns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listHymns() as Promise<Hymn[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHymn(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Hymn | null>({
    queryKey: ["hymn", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (actor.getHymn(id) as Promise<Hymn | null>);
      return result;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useSearchHymns(query: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Hymn[]>({
    queryKey: ["hymns", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchHymns(query) as Promise<Hymn[]>;
    },
    enabled: !!actor && !isFetching && !!query.trim(),
  });
}

// ─── Bible Readings ────────────────────────────────────────────────────────

export function useBibleReadings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BibleReading[]>({
    queryKey: ["bibleReadings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBibleReadings() as Promise<BibleReading[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBibleReading(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BibleReading | null>({
    queryKey: ["bibleReading", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getBibleReading(id) as Promise<BibleReading | null>;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useSetReadingOfDay() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setReadingOfDay(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }),
  });
}

// ─── Announcements ────────────────────────────────────────────────────────

export function useAnnouncements() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAnnouncements() as Promise<Announcement[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAnnouncement(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Announcement | null>({
    queryKey: ["announcement", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getAnnouncement(id) as Promise<Announcement | null>;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

// ─── Sermons ──────────────────────────────────────────────────────────────

export function useSermons() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sermon[]>({
    queryKey: ["sermons"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSermons() as Promise<Sermon[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSermon(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sermon | null>({
    queryKey: ["sermon", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getSermon(id) as Promise<Sermon | null>;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

// ─── Sunday Program ───────────────────────────────────────────────────────

export function useProgramItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProgramItem[]>({
    queryKey: ["programItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProgramItems() as Promise<ProgramItem[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Sunday School ────────────────────────────────────────────────────────

export function useClasses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Class[]>({
    queryKey: ["classes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listClasses() as Promise<Class[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClass(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Class | null>({
    queryKey: ["class", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getClass(id) as Promise<Class | null>;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useLectureMaterials(classId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LectureMaterial[]>({
    queryKey: ["lectureMaterials", classId?.toString()],
    queryFn: async () => {
      if (!actor || classId === undefined) return [];
      return actor.listLectureMaterials(classId) as Promise<LectureMaterial[]>;
    },
    enabled: !!actor && !isFetching && classId !== undefined,
  });
}

// ─── Youth Ministry ───────────────────────────────────────────────────────

export function useYouthItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<YouthItem[]>({
    queryKey: ["youthItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listYouthItems() as Promise<YouthItem[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Mothers' Union ───────────────────────────────────────────────────────

export function useMothersItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MothersItem[]>({
    queryKey: ["mothersItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMothersItems() as Promise<MothersItem[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Men's Association ────────────────────────────────────────────────────

export function useMensItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MensItem[]>({
    queryKey: ["mensItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMensItems() as Promise<MensItem[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Offering ─────────────────────────────────────────────────────────────

export function useOfferingInfo() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OfferingInfo | null>({
    queryKey: ["offeringInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOfferingInfo() as Promise<OfferingInfo | null>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Modern Service Book ─────────────────────────────────────────────────

export function useServiceBookItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ServiceBookItem[]>({
    queryKey: ["serviceBookItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listServiceBookItems() as Promise<ServiceBookItem[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Mutation Hooks ───────────────────────────────────────────────────────

// Hymns
export function useAddHymn() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Hymn, Error, HymnInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addHymn(input) as Promise<Hymn>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hymns"] }),
  });
}

export function useUpdateHymn() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Hymn | null, Error, { id: bigint; input: HymnInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateHymn(id, input) as Promise<Hymn | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hymns"] }),
  });
}

export function useDeleteHymn() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteHymn(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hymns"] }),
  });
}

// Bible Readings
export function useAddBibleReading() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<BibleReading, Error, BibleReadingInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addBibleReading(input) as Promise<BibleReading>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }),
  });
}

export function useUpdateBibleReading() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<BibleReading | null, Error, { id: bigint; input: BibleReadingInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateBibleReading(id, input) as Promise<BibleReading | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }),
  });
}

export function useDeleteBibleReading() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteBibleReading(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }),
  });
}

// Announcements
export function useAddAnnouncement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Announcement, Error, AnnouncementInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addAnnouncement(input) as Promise<Announcement>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useUpdateAnnouncement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Announcement | null, Error, { id: bigint; input: AnnouncementInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateAnnouncement(id, input) as Promise<Announcement | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteAnnouncement(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

// Sermons
export function useAddSermon() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Sermon, Error, SermonInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addSermon(input) as Promise<Sermon>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sermons"] }),
  });
}

export function useUpdateSermon() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Sermon | null, Error, { id: bigint; input: SermonInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateSermon(id, input) as Promise<Sermon | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sermons"] }),
  });
}

export function useDeleteSermon() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteSermon(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sermons"] }),
  });
}

// Sunday Program
export function useAddProgramItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<ProgramItem, Error, ProgramItemInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProgramItem(input) as Promise<ProgramItem>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["programItems"] }),
  });
}

export function useUpdateProgramItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<ProgramItem | null, Error, { id: bigint; input: ProgramItemInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProgramItem(id, input) as Promise<ProgramItem | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["programItems"] }),
  });
}

export function useDeleteProgramItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProgramItem(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["programItems"] }),
  });
}

// Sunday School Classes
export function useAddClass() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Class, Error, ClassInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addClass(input) as Promise<Class>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
}

export function useUpdateClass() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Class | null, Error, { id: bigint; input: ClassInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateClass(id, input) as Promise<Class | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
}

export function useDeleteClass() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteClass(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }),
  });
}

// Lecture Materials
export function useAddLectureMaterial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<LectureMaterial, Error, LectureMaterialInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addLectureMaterial(input) as Promise<LectureMaterial>;
    },
    onSuccess: (data) => qc.invalidateQueries({ queryKey: ["lectureMaterials", data.classId.toString()] }),
  });
}

export function useDeleteLectureMaterial() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, { id: bigint; classId: bigint }>({
    mutationFn: async ({ id }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteLectureMaterial(id) as Promise<boolean>;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["lectureMaterials", vars.classId.toString()] }),
  });
}

// Youth Ministry
export function useAddYouthItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<YouthItem, Error, YouthItemInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addYouthItem(input) as Promise<YouthItem>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["youthItems"] }),
  });
}

export function useUpdateYouthItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<YouthItem | null, Error, { id: bigint; input: YouthItemInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateYouthItem(id, input) as Promise<YouthItem | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["youthItems"] }),
  });
}

export function useDeleteYouthItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteYouthItem(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["youthItems"] }),
  });
}

// Mothers' Union
export function useAddMothersItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<MothersItem, Error, MothersItemInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addMothersItem(input) as Promise<MothersItem>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mothersItems"] }),
  });
}

export function useUpdateMothersItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<MothersItem | null, Error, { id: bigint; input: MothersItemInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateMothersItem(id, input) as Promise<MothersItem | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mothersItems"] }),
  });
}

export function useDeleteMothersItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteMothersItem(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mothersItems"] }),
  });
}

// Men's Association
export function useAddMensItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<MensItem, Error, MensItemInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addMensItem(input) as Promise<MensItem>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mensItems"] }),
  });
}

export function useUpdateMensItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<MensItem | null, Error, { id: bigint; input: MensItemInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateMensItem(id, input) as Promise<MensItem | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mensItems"] }),
  });
}

export function useDeleteMensItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteMensItem(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mensItems"] }),
  });
}

// Offering
export function useUpdateOfferingInfo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, OfferingInfo>({
    mutationFn: async (info) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateOfferingInfo(info) as Promise<void>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["offeringInfo"] }),
  });
}

// Service Book
export function useAddServiceBookItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<ServiceBookItem, Error, ServiceBookItemInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addServiceBookItem(input) as Promise<ServiceBookItem>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceBookItems"] }),
  });
}

export function useUpdateServiceBookItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<ServiceBookItem | null, Error, { id: bigint; input: ServiceBookItemInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateServiceBookItem(id, input) as Promise<ServiceBookItem | null>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceBookItems"] }),
  });
}

export function useDeleteServiceBookItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteServiceBookItem(id) as Promise<boolean>;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceBookItems"] }),
  });
}
