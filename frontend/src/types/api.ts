export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string | null;
  coverImage: string | null;
  link: string | null;
  github: string | null;
  published: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
