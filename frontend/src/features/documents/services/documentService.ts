import { api } from '../../../core/api/client';

export interface DocumentDTO {
  id: string;
  title: string;
  pages: number;
  size: number;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  folderId?: string;
  tags: string[];
  ocrText?: string;
  syncStatus: 'synced' | 'pending' | 'local_only';
}

export interface FolderDTO {
  id: string;
  name: string;
  color: string;
  icon: string;
  documentCount: number;
  createdAt: string;
}

export interface UploadResponse {
  document: DocumentDTO;
  ocrText?: string;
}

export const documentService = {
  // Documents
  async getDocuments(params?: { search?: string; folderId?: string; tag?: string; sort?: string }): Promise<DocumentDTO[]> {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.folderId) query.set('folderId', params.folderId);
    if (params?.tag) query.set('tag', params.tag);
    if (params?.sort) query.set('sort', params.sort);
    const qs = query.toString();
    return api.get<DocumentDTO[]>(`/documents${qs ? '?' + qs : ''}`);
  },

  async getDocument(id: string): Promise<DocumentDTO> {
    return api.get<DocumentDTO>(`/documents/${id}`);
  },

  async uploadDocument(imageUris: string[], title?: string, folderId?: string): Promise<UploadResponse> {
    const formData = new FormData();
    imageUris.forEach((uri, i) => {
      formData.append('images', {
        uri,
        type: 'image/jpeg',
        name: `page_${i + 1}.jpg`,
      } as any);
    });
    if (title) formData.append('title', title);
    if (folderId) formData.append('folderId', folderId);
    return api.upload<UploadResponse>('/documents/upload', formData);
  },

  async updateDocument(id: string, data: Partial<Pick<DocumentDTO, 'title' | 'folderId' | 'tags' | 'isFavorite'>>): Promise<DocumentDTO> {
    return api.patch<DocumentDTO>(`/documents/${id}`, data);
  },

  async deleteDocument(id: string): Promise<void> {
    return api.delete(`/documents/${id}`);
  },

  async toggleFavorite(id: string): Promise<DocumentDTO> {
    return api.post<DocumentDTO>(`/documents/${id}/favorite`);
  },

  // Folders
  async getFolders(): Promise<FolderDTO[]> {
    return api.get<FolderDTO[]>('/folders');
  },

  async createFolder(name: string, color: string): Promise<FolderDTO> {
    return api.post<FolderDTO>('/folders', { name, color });
  },

  async updateFolder(id: string, data: Partial<Pick<FolderDTO, 'name' | 'color'>>): Promise<FolderDTO> {
    return api.patch<FolderDTO>(`/folders/${id}`, data);
  },

  async deleteFolder(id: string): Promise<void> {
    return api.delete(`/folders/${id}`);
  },
};
