export interface Todo {
  id: number;
  content: string;
  dueDate: string;
  completed: boolean;
  completed_at?: string;
}