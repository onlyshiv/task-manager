export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}
