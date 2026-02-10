export interface MockDocument {
  id: string;
  title: string;
  pages: number;
  size: number;
  thumbnailColor: string;
  thumbnailUri?: string; // Local image URI for scanned documents
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  folderId?: string;
  tags: string[];
  ocrText?: string;
  syncStatus: 'synced' | 'pending' | 'local_only';
}

export interface MockFolder {
  id: string;
  name: string;
  color: string;
  icon: string;
  documentCount: number;
  createdAt: string;
}

const THUMBNAIL_COLORS = ['#E3F2FD', '#FFF3E0', '#E8F5E9', '#FCE4EC', '#F3E5F5', '#E0F2F1', '#FFF8E1', '#EDE7F6'];

export const MOCK_FOLDERS: MockFolder[] = [
  { id: 'f1', name: 'Receipts', color: '#FF9800', icon: 'receipt-outline', documentCount: 12, createdAt: '2025-01-15T10:00:00Z' },
  { id: 'f2', name: 'Contracts', color: '#4CAF50', icon: 'document-text-outline', documentCount: 5, createdAt: '2025-01-10T10:00:00Z' },
  { id: 'f3', name: 'Notes', color: '#2196F3', icon: 'create-outline', documentCount: 23, createdAt: '2025-01-05T10:00:00Z' },
  { id: 'f4', name: 'ID Documents', color: '#F44336', icon: 'card-outline', documentCount: 4, createdAt: '2025-02-01T10:00:00Z' },
  { id: 'f5', name: 'Business Cards', color: '#9C27B0', icon: 'people-outline', documentCount: 8, createdAt: '2025-01-20T10:00:00Z' },
];

export const MOCK_DOCUMENTS: MockDocument[] = [
  { id: 'd1', title: 'Monthly Expense Report', pages: 3, size: 2456000, thumbnailColor: THUMBNAIL_COLORS[0], createdAt: '2025-02-08T14:30:00Z', updatedAt: '2025-02-08T14:30:00Z', isFavorite: true, folderId: 'f1', tags: ['work', 'expense'], ocrText: 'Monthly expense report for January 2025. Total expenses: $3,450.00', syncStatus: 'synced' },
  { id: 'd2', title: 'Lease Agreement', pages: 12, size: 8900000, thumbnailColor: THUMBNAIL_COLORS[1], createdAt: '2025-02-07T09:15:00Z', updatedAt: '2025-02-07T09:15:00Z', isFavorite: true, folderId: 'f2', tags: ['legal', 'housing'], ocrText: 'This Lease Agreement is entered into as of February 1, 2025', syncStatus: 'synced' },
  { id: 'd3', title: 'Meeting Notes - Sprint Review', pages: 2, size: 1200000, thumbnailColor: THUMBNAIL_COLORS[2], createdAt: '2025-02-06T16:45:00Z', updatedAt: '2025-02-06T16:45:00Z', isFavorite: false, folderId: 'f3', tags: ['work', 'meeting'], ocrText: 'Sprint review notes. Completed: 15 story points. Carried over: 3 items.', syncStatus: 'synced' },
  { id: 'd4', title: 'Passport Copy', pages: 2, size: 3400000, thumbnailColor: THUMBNAIL_COLORS[3], createdAt: '2025-02-05T11:00:00Z', updatedAt: '2025-02-05T11:00:00Z', isFavorite: true, folderId: 'f4', tags: ['personal', 'id'], syncStatus: 'synced' },
  { id: 'd5', title: 'Restaurant Receipt - Sakura', pages: 1, size: 450000, thumbnailColor: THUMBNAIL_COLORS[4], createdAt: '2025-02-04T20:30:00Z', updatedAt: '2025-02-04T20:30:00Z', isFavorite: false, folderId: 'f1', tags: ['receipt', 'food'], ocrText: 'Sakura Japanese Restaurant. Total: $45.80. Tip: $9.16', syncStatus: 'pending' },
  { id: 'd6', title: 'Electricity Bill - January', pages: 1, size: 670000, thumbnailColor: THUMBNAIL_COLORS[5], createdAt: '2025-02-03T08:00:00Z', updatedAt: '2025-02-03T08:00:00Z', isFavorite: false, tags: ['bill', 'utilities'], ocrText: 'Meralco Electric Bill. Amount due: PHP 3,250.00. Due date: Feb 15, 2025', syncStatus: 'synced' },
  { id: 'd7', title: 'Business Card - John Smith', pages: 1, size: 280000, thumbnailColor: THUMBNAIL_COLORS[6], createdAt: '2025-02-02T13:20:00Z', updatedAt: '2025-02-02T13:20:00Z', isFavorite: false, folderId: 'f5', tags: ['contact'], ocrText: 'John Smith. Senior Engineer. john@techcorp.com. +1-555-0123', syncStatus: 'local_only' },
  { id: 'd8', title: 'Handwritten Notes - Physics', pages: 5, size: 4100000, thumbnailColor: THUMBNAIL_COLORS[7], createdAt: '2025-02-01T10:00:00Z', updatedAt: '2025-02-01T10:00:00Z', isFavorite: false, folderId: 'f3', tags: ['school', 'physics'], syncStatus: 'synced' },
  { id: 'd9', title: 'Insurance Policy', pages: 8, size: 6200000, thumbnailColor: THUMBNAIL_COLORS[0], createdAt: '2025-01-28T14:00:00Z', updatedAt: '2025-01-28T14:00:00Z', isFavorite: true, folderId: 'f2', tags: ['legal', 'insurance'], syncStatus: 'synced' },
  { id: 'd10', title: 'Grocery Receipt - SM', pages: 1, size: 320000, thumbnailColor: THUMBNAIL_COLORS[1], createdAt: '2025-01-25T17:45:00Z', updatedAt: '2025-01-25T17:45:00Z', isFavorite: false, folderId: 'f1', tags: ['receipt', 'grocery'], ocrText: 'SM Supermarket. Total: PHP 2,150.00', syncStatus: 'synced' },
];
