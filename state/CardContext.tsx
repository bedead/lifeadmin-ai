import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Card } from '../types/card';

interface CardContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  editCard: (id: string, updates: Partial<Card>) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);
const STORAGE_KEY = 'lifeadmin_cards';

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setCards(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = async (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCard: Card = {
      ...card,
      id: uuid.v4() as string,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCards(prev => [...prev, newCard]);
  };

  const editCard = async (id: string, updates: Partial<Card>) => {
    setCards(prev => prev.map(card => card.id === id ? { ...card, ...updates, updatedAt: new Date().toISOString() } : card));
  };

  const removeCard = async (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  return (
    <CardContext.Provider value={{ cards, addCard, editCard, removeCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error('useCards must be used within a CardProvider');
  return ctx;
}; 