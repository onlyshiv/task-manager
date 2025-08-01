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
import { Trash2 } from 'lucide-react';

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
   <div className="min-h-screen bg-background px-4 sm:px-6 py-6 sm:py-8">
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
      <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center mb-6 gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredTasks.map((task) => (
        <Card
          key={task.id}
          className="p-6 sm:p-7 rounded-3xl shadow-2xl transition-all duration-300
                    !border-0
                    bg-[oklch(0.94_0.01_260)]
                    text-[oklch(0.15_0_0)]
                    dark:bg-[oklch(0.28_0.03_260)]
                    dark:text-[oklch(0.98_0_0)]
                    hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold leading-snug tracking-tight text-foreground max-w-[80%] truncate">
              {task.title}
            </h2>
              <Badge
                variant="secondary"
                className={`px-3 py-[6px] rounded-full text-xs font-semibold tracking-tight shadow-sm
                  ${
                    task.status === 'completed'
                      ? 'bg-[oklch(0.52_0.22_135)] text-[oklch(1_0_0)] dark:bg-[oklch(0.36_0.12_135)] dark:text-[oklch(0.97_0.01_135)]'
                      : 'bg-[oklch(0.9_0.01_250)] text-[oklch(0.32_0.02_250)] dark:bg-[oklch(0.22_0.01_250)] dark:text-[oklch(0.96_0.01_250)]'
                  }`}
              >
                {task.status}
              </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5 text-xs font-medium">
            <Badge className="px-3 py-[6px] rounded-full 
              bg-[oklch(0.3_0.15_250)] 
              text-white 
              dark:bg-[oklch(0.3_0.15_250)] 
              dark:text-white"
            >
              {task.priority || 'Normal'}
            </Badge>
            <Badge className="px-3 py-[6px] rounded-full 
              bg-[oklch(0.88_0.03_250)] 
              text-[oklch(0.28_0.04_250)] 
              dark:bg-[oklch(0.32_0.04_250)] 
              dark:text-[oklch(0.96_0.01_250)]"
            >
              {task.dueDate ? `Due: ${task.dueDate}` : 'No Due Date'}
            </Badge>
            <Badge className="px-3 py-[6px] rounded-full 
              bg-[oklch(0.88_0.03_250)] 
              text-[oklch(0.28_0.04_250)] 
              dark:bg-[oklch(0.32_0.04_250)] 
              dark:text-[oklch(0.96_0.01_250)]"
            >
              {task.assignee || 'Unassigned'}
            </Badge>
          </div>

         <div className="mt-auto flex justify-end gap-2 pt-4">
          <Button
            size="sm"
            className="px-4 py-2 rounded-full 
                      bg-[oklch(0.3_0.02_250)] text-white 
                      hover:bg-[oklch(0.25_0.02_250)] 
                      dark:bg-[oklch(0.85_0.01_250)] dark:text-[oklch(0.1_0_0)] 
                      dark:hover:bg-[oklch(0.9_0.01_250)] 
                      transition"
            onClick={() => setEditingTask(task)}
          >
            Update
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-[oklch(0.65_0.2_30)] text-white hover:bg-[oklch(0.6_0.2_30)] dark:bg-[oklch(0.55_0.2_30)] dark:hover:bg-[oklch(0.5_0.2_30)] transition"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                dispatch(deleteTask(task.id));
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
