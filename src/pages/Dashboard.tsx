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

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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

      {/* Add Task */}
      <div className="mb-6">
        <AddTaskForm />
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
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="p-5 rounded-2xl shadow-md transition hover:shadow-lg border border-border"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold truncate max-w-[80%]">
                {task.title}
              </h2>
            <Badge
              variant="secondary"
              className={
                task.status === 'completed'
                  ? 'bg-green-100 text-green-700 dark:bg-green-800/20'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/20'
              }
            >
              {task.status}
            </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {task.description}
            </p>
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