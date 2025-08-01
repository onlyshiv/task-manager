import { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateTask } from '../features/tasks/taskSlice';
import type { Task } from '../types';
import { Button } from '@/components/ui/button';

interface Props {
  task: Task;
  onClose: () => void;
}

const EditTaskForm = ({ task, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<'pending' | 'completed'>(task.status);
  const [assignee, setAssignee] = useState(task.assignee);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTask({ ...task, title, description, status, assignee, dueDate, priority }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white w-full max-w-lg p-6 rounded-lg shadow-lg relative mx-4 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea
              id="description"
              rows={3}
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="assignee" className="block text-sm font-medium">Assignee</label>
            <input
              id="assignee"
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-medium">Due Date</label>
            <input
              id="dueDate"
              type="date"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium">Priority</label>
            <select
              id="priority"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium">Status</label>
            <select
              id="status"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
