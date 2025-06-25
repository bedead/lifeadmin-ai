// Task type definition for Life Admin Scheduler
export type Task = {
  id: string;
  title: string;
  category: string;
  dueDate: string; // ISO string
  recurrence: 'none' | "daily" | 'weekly' | 'monthly' | 'yearly';
  done: boolean;
  snoozed: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
