import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../features/tasks/taskSlice';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskForm from '../components/EditTaskForm';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Task } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            size="sm"
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <AddTaskForm />
        <div className="ml-auto">
          <select
            className="px-3 py-2 border rounded-md bg-[oklch(var(--card))] text-[oklch(var(--card-foreground))] border-[oklch(var(--border))] text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'completed')}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Edit Task Dialog */}
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {/* States */}
      {loading && (
        <p className="text-center text-muted-foreground mt-6">Loading tasks...</p>
      )}
      {error && (
        <p className="text-center text-red-500 mt-6">{error}</p>
      )}
      {!loading && tasks.length === 0 && (
        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-lg font-medium">No tasks yet.</p>
          <p className="text-sm">Use “Add Task” above to begin.</p>
        </div>
      )}

      {/* Task Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="p-5 rounded-2xl shadow-xl border border-transparent bg-[oklch(0.98 0 0)] text-[oklch(0.15 0 0)] dark:bg-[oklch(0.24 0 0)] dark:text-[oklch(0.98 0 0)]"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-foreground max-w-[80%] truncate">
                {task.title}
              </h2>
              <Badge
                variant="secondary"
                className={
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/20 dark:text-yellow-300'
                }
              >
                {task.status}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {task.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {task.priority || 'Normal'}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200">
                {task.dueDate ? `Due: ${task.dueDate}` : 'No Due Date'}
              </Badge>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200">
                {task.assignee || 'Unassigned'}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingTask(task)}
              >
                <Pencil className="w-4 h-4 mr-1" /> Edit
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    dispatch(deleteTask(task.id));
                  }
                }}
                className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
