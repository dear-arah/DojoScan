import { create } from 'zustand';
import { MOCK_DOCUMENTS, MOCK_FOLDERS, MockDocument, MockFolder } from '../../shared/utils/mockData';

type SortBy = 'date_newest' | 'date_oldest' | 'name_asc' | 'name_desc' | 'size';
type ViewMode = 'grid' | 'list';

interface DocumentState {
  documents: MockDocument[];
  folders: MockFolder[];
  searchQuery: string;
  sortBy: SortBy;
  viewMode: ViewMode;
  selectedFolderId: string | null;
  selectedTags: string[];

  // Actions
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortBy) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleFavorite: (id: string) => void;
  deleteDocument: (id: string) => void;
  renameDocument: (id: string, title: string) => void;
  addDocument: (document: MockDocument) => void;
  setSelectedFolder: (folderId: string | null) => void;
  addFolder: (name: string, color: string) => void;
  deleteFolder: (id: string) => void;

  // Computed
  getFilteredDocuments: () => MockDocument[];
  getFavorites: () => MockDocument[];
  getDocumentsByFolder: (folderId: string) => MockDocument[];
  getAllTags: () => string[];
}

export const useDocumentStore = create<DocumentState>()((set, get) => ({
  documents: MOCK_DOCUMENTS,
  folders: MOCK_FOLDERS,
  searchQuery: '',
  sortBy: 'date_newest',
  viewMode: 'grid',
  selectedFolderId: null,
  selectedTags: [],

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setViewMode: (viewMode) => set({ viewMode }),

  toggleFavorite: (id) =>
    set((state) => ({
      documents: state.documents.map((d) =>
        d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
      ),
    })),

  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((d) => d.id !== id),
    })),

  renameDocument: (id, title) =>
    set((state) => ({
      documents: state.documents.map((d) =>
        d.id === id ? { ...d, title } : d
      ),
    })),

  addDocument: (document) =>
    set((state) => ({
      documents: [document, ...state.documents],
    })),

  setSelectedFolder: (selectedFolderId) => set({ selectedFolderId }),

  addFolder: (name, color) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          id: `f${Date.now()}`,
          name,
          color,
          icon: 'folder-outline',
          documentCount: 0,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.id !== id),
      documents: state.documents.map((d) =>
        d.folderId === id ? { ...d, folderId: undefined } : d
      ),
    })),

  getFilteredDocuments: () => {
    const { documents, searchQuery, sortBy } = get();
    let filtered = [...documents];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          (d.ocrText && d.ocrText.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'date_newest': filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()); break;
      case 'date_oldest': filtered.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()); break;
      case 'name_asc': filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'name_desc': filtered.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'size': filtered.sort((a, b) => b.size - a.size); break;
    }

    return filtered;
  },

  getFavorites: () => get().documents.filter((d) => d.isFavorite),
  getDocumentsByFolder: (folderId) => get().documents.filter((d) => d.folderId === folderId),
  getAllTags: () => {
    const tags = new Set<string>();
    get().documents.forEach((d) => d.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  },
}));
