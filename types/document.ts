export interface Document {
  id: string;
  title: string;
  notes?: string;
  fileUri: string;
  fileType: 'image' | 'pdf' | 'other';
  thumbnailUri?: string;
  createdAt: string;
  updatedAt: string;
  isCustom?: boolean;
} 