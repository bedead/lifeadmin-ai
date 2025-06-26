import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Document } from '../types/document';

interface DocumentContextType {
  documents: Document[];
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  editDocument: (id: string, updates: Partial<Document>) => Promise<void>;
  removeDocument: (id: string) => Promise<void>;
  replaceDocument: (id: string, fileUri: string, fileType: Document['fileType'], thumbnailUri?: string) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);
const STORAGE_KEY = 'lifeadmin_documents';

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setDocuments(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  const addDocument = async (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDoc: Document = {
      ...doc,
      id: uuid.v4() as string,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const editDocument = async (id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, ...updates, updatedAt: new Date().toISOString() } : doc));
  };

  const removeDocument = async (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const replaceDocument = async (id: string, fileUri: string, fileType: Document['fileType'], thumbnailUri?: string) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, fileUri, fileType, thumbnailUri, updatedAt: new Date().toISOString() } : doc));
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, editDocument, removeDocument, replaceDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error('useDocuments must be used within a DocumentProvider');
  return ctx;
}; 