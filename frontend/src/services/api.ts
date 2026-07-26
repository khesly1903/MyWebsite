import type { Article, Note, Project } from '../types/api';

const BASE_URL = import.meta.env.VITE_API_URL as string;
const TOKEN_KEY = 'admin_token';

async function apiFetch<T>(path: string, options?: RequestInit & { auth?: boolean }): Promise<T> {
  const { auth, ...fetchOptions } = options ?? {};

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string> ?? {}),
  };

  if (auth) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...fetchOptions, headers });

  if (res.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event('auth:logout'));
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `API error ${res.status}: ${res.statusText}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// --- Auth ---

export const authApi = {
  login: (email: string, password: string): Promise<{ access_token: string }> =>
    apiFetch<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// --- Public API (published only) ---

export const articlesApi = {
  getAll: (): Promise<Article[]> => apiFetch<Article[]>('/articles'),
  getBySlug: (slug: string): Promise<Article> => apiFetch<Article>(`/articles/slug/${slug}`),
};

export const notesApi = {
  getAll: (): Promise<Note[]> => apiFetch<Note[]>('/notes'),
};

export const projectsApi = {
  getAll: (): Promise<Project[]> => apiFetch<Project[]>('/projects'),
  getById: (id: string): Promise<Project> => apiFetch<Project>(`/projects/${id}`),
};

export type CreateContactDto = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot — must stay empty
};

export const contactApi = {
  send: (dto: CreateContactDto): Promise<{ success: boolean }> =>
    apiFetch<{ success: boolean }>('/contact', { method: 'POST', body: JSON.stringify(dto) }),
};

// --- Admin API (auth required for writes) ---

export type CreateArticleDto = {
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  published?: boolean;
  isFeatured?: boolean;
  isHero?: boolean;
};

export type CreateNoteDto = {
  title: string;
  content: string;
  published?: boolean;
};

export type CreateProjectDto = {
  title: string;
  description: string;
  content?: string;
  coverImage?: string;
  link?: string;
  github?: string;
  published?: boolean;
  isFeatured?: boolean;
  isHero?: boolean;
};

export const adminArticlesApi = {
  getAll: (): Promise<Article[]> => apiFetch<Article[]>('/articles?all=true'),
  getById: (id: string): Promise<Article> => apiFetch<Article>(`/articles/${id}?all=true`),
  create: (dto: CreateArticleDto): Promise<Article> =>
    apiFetch<Article>('/articles', { method: 'POST', body: JSON.stringify(dto), auth: true }),
  update: (id: string, dto: Partial<CreateArticleDto>): Promise<Article> =>
    apiFetch<Article>(`/articles/${id}`, { method: 'PATCH', body: JSON.stringify(dto), auth: true }),
  delete: (id: string): Promise<void> =>
    apiFetch<void>(`/articles/${id}`, { method: 'DELETE', auth: true }),
};

export const adminNotesApi = {
  getAll: (): Promise<Note[]> => apiFetch<Note[]>('/notes?all=true'),
  getById: (id: string): Promise<Note> => apiFetch<Note>(`/notes/${id}?all=true`),
  create: (dto: CreateNoteDto): Promise<Note> =>
    apiFetch<Note>('/notes', { method: 'POST', body: JSON.stringify(dto), auth: true }),
  update: (id: string, dto: Partial<CreateNoteDto>): Promise<Note> =>
    apiFetch<Note>(`/notes/${id}`, { method: 'PATCH', body: JSON.stringify(dto), auth: true }),
  delete: (id: string): Promise<void> =>
    apiFetch<void>(`/notes/${id}`, { method: 'DELETE', auth: true }),
};

export const adminProjectsApi = {
  getAll: (): Promise<Project[]> => apiFetch<Project[]>('/projects?all=true'),
  getById: (id: string): Promise<Project> => apiFetch<Project>(`/projects/${id}?all=true`),
  create: (dto: CreateProjectDto): Promise<Project> =>
    apiFetch<Project>('/projects', { method: 'POST', body: JSON.stringify(dto), auth: true }),
  update: (id: string, dto: Partial<CreateProjectDto>): Promise<Project> =>
    apiFetch<Project>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(dto), auth: true }),
  delete: (id: string): Promise<void> =>
    apiFetch<void>(`/projects/${id}`, { method: 'DELETE', auth: true }),
};
