import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export type HymnInput = { number: number; title: string; lyrics: string };
export type BibleReadingInput = { reference: string; text: string };
export type AnnouncementInput = { title: string; body: string; pinned: boolean };
export type SermonInput = { preacher: string; theme: string; date: number; scriptureRef: string; notes: string };
export type ProgramItemInput = { time: string; activity: string; order: number };
export type ClassInput = { name: string; teacher: string; schedule: string; description: string };
export type YouthItemInput = { category: string; title: string; description: string; date?: number; leader: string };
export type MothersItemInput = { category: string; title: string; description: string; date?: number; leader: string };
export type MensItemInput = { category: string; title: string; description: string; date?: number; leader: string };
export type ServiceBookItemInput = { step: number; title: string; content: string };
export type OfferingInfo = { mpesaName: string; mpesaNumber: string; bankName: string; bankAccount: string; bankBranch: string; instructions: string };

export function useHymns() { return useQuery({ queryKey: ["hymns"], queryFn: () => api.getHymns(), staleTime: 60*60*1000 }); }
export function useHymn(id: string | undefined) { return useQuery({ queryKey: ["hymn", id], queryFn: () => api.getHymn(id!), enabled: !!id }); }
export function useHymnSearch(query: string) { return useQuery({ queryKey: ["hymns","search",query], queryFn: () => api.searchHymns(query), enabled: !!query.trim() }); }
export function useAddHymn() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: HymnInput) => api.createHymn(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["hymns"] }) }); }
export function useUpdateHymn() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: HymnInput }) => api.updateHymn(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["hymns"] }) }); }
export function useDeleteHymn() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteHymn(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["hymns"] }) }); }

export function useBibleReadings() { return useQuery({ queryKey: ["bibleReadings"], queryFn: () => api.getBibleReadings(), staleTime: 60*60*1000 }); }
export function useBibleReading(id: string | undefined) { return useQuery({ queryKey: ["bibleReading", id], queryFn: () => api.getBibleReadings().then((r: any[]) => r.find((x: any) => x.id === id) ?? null), enabled: !!id }); }
export function useSetReadingOfDay() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.setReadingOfDay(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }) }); }
export function useAddBibleReading() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: BibleReadingInput) => api.createBibleReading(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }) }); }
export function useDeleteBibleReading() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteBibleReading(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }) }); }

export function useAnnouncements() { return useQuery({ queryKey: ["announcements"], queryFn: () => api.getAnnouncements(), staleTime: 5*60*1000, refetchOnWindowFocus: true }); }
export function useAnnouncement(id: string | undefined) { return useQuery({ queryKey: ["announcement", id], queryFn: () => api.getAnnouncement(id!), enabled: !!id }); }
export function useAddAnnouncement() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: AnnouncementInput) => api.createAnnouncement(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }) }); }
export function useUpdateAnnouncement() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: AnnouncementInput }) => api.updateAnnouncement(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }) }); }
export function useDeleteAnnouncement() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteAnnouncement(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }) }); }

export function useSermons() { return useQuery({ queryKey: ["sermons"], queryFn: () => api.getSermons(), staleTime: 30*60*1000 }); }
export function useSermon(id: string | undefined) { return useQuery({ queryKey: ["sermon", id], queryFn: () => api.getSermon(id!), enabled: !!id }); }
export function useAddSermon() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: SermonInput) => api.createSermon(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["sermons"] }) }); }
export function useUpdateSermon() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: SermonInput }) => api.updateSermon(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["sermons"] }) }); }
export function useDeleteSermon() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteSermon(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["sermons"] }) }); }

export function useProgramItems() { return useQuery({ queryKey: ["programItems"], queryFn: () => api.getSundayProgram(), refetchInterval: 30*1000 }); }
export function useAddProgramItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: ProgramItemInput) => api.createProgramItem(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["programItems"] }) }); }
export function useUpdateProgramItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: ProgramItemInput }) => api.updateProgramItem(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["programItems"] }) }); }
export function useDeleteProgramItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteProgramItem(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["programItems"] }) }); }

export function useClasses() { return useQuery({ queryKey: ["classes"], queryFn: () => api.getServiceBook() }); }
export function useClass(id: string | undefined) { return useQuery({ queryKey: ["class", id], queryFn: () => api.getServiceBook().then((r: any[]) => r.find((x: any) => x.id === id) ?? null), enabled: !!id }); }

export function useYouthItems() { return useQuery({ queryKey: ["youthItems"], queryFn: () => api.getYouthItems() }); }
export function useAddYouthItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: YouthItemInput) => api.createYouthItem(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["youthItems"] }) }); }
export function useUpdateYouthItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: YouthItemInput }) => api.updateYouthItem(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["youthItems"] }) }); }
export function useDeleteYouthItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteYouthItem(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["youthItems"] }) }); }

export function useMothersItems() { return useQuery({ queryKey: ["mothersItems"], queryFn: () => api.getMothersItems() }); }
export function useAddMothersItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: MothersItemInput) => api.createMothersItem(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["mothersItems"] }) }); }
export function useUpdateMothersItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: MothersItemInput }) => api.updateMothersItem(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["mothersItems"] }) }); }
export function useDeleteMothersItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteMothersItem(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["mothersItems"] }) }); }

export function useMensItems() { return useQuery({ queryKey: ["mensItems"], queryFn: () => api.getMensItems() }); }
export function useAddMensItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: MensItemInput) => api.createMensItem(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["mensItems"] }) }); }
export function useUpdateMensItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: MensItemInput }) => api.updateMensItem(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["mensItems"] }) }); }
export function useDeleteMensItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteMensItem(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["mensItems"] }) }); }

export function useOfferingInfo() { return useQuery({ queryKey: ["offeringInfo"], queryFn: () => api.getOffering() }); }
export function useUpdateOfferingInfo() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (info: OfferingInfo) => api.updateOffering(info, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["offeringInfo"] }) }); }

export function useServiceBookItems() { return useQuery({ queryKey: ["serviceBookItems"], queryFn: () => api.getServiceBook() }); }
export function useAddServiceBookItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: ServiceBookItemInput) => api.createServiceBookItem(input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceBookItems"] }) }); }
export function useUpdateServiceBookItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: ServiceBookItemInput }) => api.updateServiceBookItem(id, input, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceBookItems"] }) }); }
export function useDeleteServiceBookItem() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteServiceBookItem(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceBookItems"] }) }); }

export function useUpdateBibleReading() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: BibleReadingInput }) => { const token = (await getToken())!; const res = await fetch(`${(import.meta as any).env.VITE_API_URL ?? "http://localhost:3001"}/api/bible-readings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(input) }); return res.json(); }, onSuccess: () => qc.invalidateQueries({ queryKey: ["bibleReadings"] }) }); }

export function useAddClass() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (input: ClassInput) => api.createServiceBookItem(input as any, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }) }); }
export function useUpdateClass() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async ({ id, input }: { id: string; input: ClassInput }) => api.updateServiceBookItem(id, input as any, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }) }); }
export function useDeleteClass() { const { getToken } = useAuth(); const qc = useQueryClient(); return useMutation({ mutationFn: async (id: string) => api.deleteServiceBookItem(id, (await getToken())!), onSuccess: () => qc.invalidateQueries({ queryKey: ["classes"] }) }); }

export type LectureMaterialInput = { classId: string; title: string; fileName: string };
export function useLectureMaterials(classId: string | undefined) { return useQuery({ queryKey: ["lectureMaterials", classId], queryFn: async () => [] as any[], enabled: !!classId }); }
export function useAddLectureMaterial() { const qc = useQueryClient(); return useMutation({ mutationFn: async (_input: LectureMaterialInput) => { throw new Error("Lecture material upload not yet implemented in the new backend"); }, onSuccess: () => qc.invalidateQueries({ queryKey: ["lectureMaterials"] }) }); }
export function useDeleteLectureMaterial() { const qc = useQueryClient(); return useMutation({ mutationFn: async (_args: { id: string; classId: string }) => { throw new Error("Lecture material delete not yet implemented in the new backend"); }, onSuccess: () => qc.invalidateQueries({ queryKey: ["lectureMaterials"] }) }); }
