import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  markDone: (id: string) => void;
  snoozeTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_KEY = 'lifeadmin_tasks';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(TASKS_KEY).then(data => {
      if (data) setTasks(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const updateTask = (task: Task) => setTasks(prev => prev.map(t => t.id === task.id ? task : t));
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));
  const markDone = (id: string) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: true } : t));
  const snoozeTask = (id: string) => setTasks(prev => prev.map(t => t.id === id ? { ...t, snoozed: true } : t));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, markDone, snoozeTask, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
