const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, options: RequestInit = {}, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Request failed");
  }
  return res.json();
}

export const getAnnouncements = () => request("/api/announcements");
export const getAnnouncement = (id: string) => request(`/api/announcements/${id}`);
export const createAnnouncement = (data: object, token: string) => request("/api/announcements", { method: "POST", body: JSON.stringify(data) }, token);
export const updateAnnouncement = (id: string, data: object, token: string) => request(`/api/announcements/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteAnnouncement = (id: string, token: string) => request(`/api/announcements/${id}`, { method: "DELETE" }, token);

export const getSermons = () => request("/api/sermons");
export const getSermon = (id: string) => request(`/api/sermons/${id}`);
export const createSermon = (data: object, token: string) => request("/api/sermons", { method: "POST", body: JSON.stringify(data) }, token);
export const updateSermon = (id: string, data: object, token: string) => request(`/api/sermons/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteSermon = (id: string, token: string) => request(`/api/sermons/${id}`, { method: "DELETE" }, token);

export const getHymns = () => request("/api/hymns");
export const getHymn = (id: string) => request(`/api/hymns/${id}`);
export const searchHymns = (q: string) => request(`/api/hymns/search?q=${encodeURIComponent(q)}`);
export const createHymn = (data: object, token: string) => request("/api/hymns", { method: "POST", body: JSON.stringify(data) }, token);
export const updateHymn = (id: string, data: object, token: string) => request(`/api/hymns/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteHymn = (id: string, token: string) => request(`/api/hymns/${id}`, { method: "DELETE" }, token);

export const getBibleReadings = () => request("/api/bible-readings");
export const createBibleReading = (data: object, token: string) => request("/api/bible-readings", { method: "POST", body: JSON.stringify(data) }, token);
export const setReadingOfDay = (id: string, token: string) => request(`/api/bible-readings/${id}/reading-of-day`, { method: "PUT" }, token);
export const deleteBibleReading = (id: string, token: string) => request(`/api/bible-readings/${id}`, { method: "DELETE" }, token);

export const getSundayProgram = () => request("/api/sunday-program");
export const createProgramItem = (data: object, token: string) => request("/api/sunday-program", { method: "POST", body: JSON.stringify(data) }, token);
export const updateProgramItem = (id: string, data: object, token: string) => request(`/api/sunday-program/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteProgramItem = (id: string, token: string) => request(`/api/sunday-program/${id}`, { method: "DELETE" }, token);

export const getYouthItems = () => request("/api/youth");
export const createYouthItem = (data: object, token: string) => request("/api/youth", { method: "POST", body: JSON.stringify(data) }, token);
export const updateYouthItem = (id: string, data: object, token: string) => request(`/api/youth/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteYouthItem = (id: string, token: string) => request(`/api/youth/${id}`, { method: "DELETE" }, token);

export const getMothersItems = () => request("/api/mothers-union");
export const createMothersItem = (data: object, token: string) => request("/api/mothers-union", { method: "POST", body: JSON.stringify(data) }, token);
export const updateMothersItem = (id: string, data: object, token: string) => request(`/api/mothers-union/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteMothersItem = (id: string, token: string) => request(`/api/mothers-union/${id}`, { method: "DELETE" }, token);

export const getMensItems = () => request("/api/mens-association");
export const createMensItem = (data: object, token: string) => request("/api/mens-association", { method: "POST", body: JSON.stringify(data) }, token);
export const updateMensItem = (id: string, data: object, token: string) => request(`/api/mens-association/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteMensItem = (id: string, token: string) => request(`/api/mens-association/${id}`, { method: "DELETE" }, token);

export const getOffering = () => request("/api/offering");
export const updateOffering = (data: object, token: string) => request("/api/offering", { method: "PUT", body: JSON.stringify(data) }, token);

export const getServiceBook = () => request("/api/service-book");
export const createServiceBookItem = (data: object, token: string) => request("/api/service-book", { method: "POST", body: JSON.stringify(data) }, token);
export const updateServiceBookItem = (id: string, data: object, token: string) => request(`/api/service-book/${id}`, { method: "PUT", body: JSON.stringify(data) }, token);
export const deleteServiceBookItem = (id: string, token: string) => request(`/api/service-book/${id}`, { method: "DELETE" }, token);
