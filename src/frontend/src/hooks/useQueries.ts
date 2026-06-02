import { createActor } from "@/backend";
import type {
  Announcement,
  BibleReading,
  Class,
  Hymn,
  MensItem,
  MothersItem,
  OfferingInfo,
  ProgramItem,
  Sermon,
  ServiceBookItem,
  YouthItem,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// ─── Hymns ────────────────────────────────────────────────────────────────────
export function useHymns() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Hymn[]>({
    queryKey: ["hymns"],
    queryFn: async () => (actor ? actor.listHymns() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useHymn(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Hymn | null>({
    queryKey: ["hymn", id.toString()],
    queryFn: async () => (actor ? actor.getHymn(id) : null),
    enabled: !!actor && !isFetching,
  });
}

export function useHymnSearch(query: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Hymn[]>({
    queryKey: ["hymns", "search", query],
    queryFn: async () =>
      actor && query.trim() ? actor.searchHymns(query) : [],
    enabled: !!actor && !isFetching && query.trim().length > 0,
  });
}

// ─── Bible Readings ───────────────────────────────────────────────────────────
export function useBibleReadings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BibleReading[]>({
    queryKey: ["bibleReadings"],
    queryFn: async () => (actor ? actor.listBibleReadings() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useBibleReading(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BibleReading | null>({
    queryKey: ["bibleReading", id.toString()],
    queryFn: async () => (actor ? actor.getBibleReading(id) : null),
    enabled: !!actor && !isFetching,
  });
}

// ─── Announcements ────────────────────────────────────────────────────────────
export function useAnnouncements() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => (actor ? actor.listAnnouncements() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useAnnouncement(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Announcement | null>({
    queryKey: ["announcement", id.toString()],
    queryFn: async () => (actor ? actor.getAnnouncement(id) : null),
    enabled: !!actor && !isFetching,
  });
}

// ─── Sermons ──────────────────────────────────────────────────────────────────
export function useSermons() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sermon[]>({
    queryKey: ["sermons"],
    queryFn: async () => (actor ? actor.listSermons() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useSermon(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sermon | null>({
    queryKey: ["sermon", id.toString()],
    queryFn: async () => (actor ? actor.getSermon(id) : null),
    enabled: !!actor && !isFetching,
  });
}

// ─── Sunday Program ───────────────────────────────────────────────────────────
export function useProgramItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProgramItem[]>({
    queryKey: ["programItems"],
    queryFn: async () => (actor ? actor.listProgramItems() : []),
    enabled: !!actor && !isFetching,
  });
}

// ─── Sunday School ────────────────────────────────────────────────────────────
export function useClasses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Class[]>({
    queryKey: ["classes"],
    queryFn: async () => (actor ? actor.listClasses() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useClass(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Class | null>({
    queryKey: ["class", id.toString()],
    queryFn: async () => (actor ? actor.getClass(id) : null),
    enabled: !!actor && !isFetching,
  });
}

// ─── Youth Ministry ───────────────────────────────────────────────────────────
export function useYouthItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<YouthItem[]>({
    queryKey: ["youthItems"],
    queryFn: async () => (actor ? actor.listYouthItems() : []),
    enabled: !!actor && !isFetching,
  });
}

// ─── Mothers Union ────────────────────────────────────────────────────────────
export function useMothersItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MothersItem[]>({
    queryKey: ["mothersItems"],
    queryFn: async () => (actor ? actor.listMothersItems() : []),
    enabled: !!actor && !isFetching,
  });
}

// ─── Men's Association ────────────────────────────────────────────────────────
export function useMensItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MensItem[]>({
    queryKey: ["mensItems"],
    queryFn: async () => (actor ? actor.listMensItems() : []),
    enabled: !!actor && !isFetching,
  });
}

// ─── Offering Info ────────────────────────────────────────────────────────────
export function useOfferingInfo() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OfferingInfo | null>({
    queryKey: ["offeringInfo"],
    queryFn: async () => (actor ? actor.getOfferingInfo() : null),
    enabled: !!actor && !isFetching,
  });
}

// ─── Service Book ─────────────────────────────────────────────────────────────
export function useServiceBookItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ServiceBookItem[]>({
    queryKey: ["serviceBookItems"],
    queryFn: async () => (actor ? actor.listServiceBookItems() : []),
    enabled: !!actor && !isFetching,
  });
}
