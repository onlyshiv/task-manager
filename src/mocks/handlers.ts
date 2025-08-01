import { http, HttpResponse } from 'msw';

let tasks = [
  {
    id: 1,
    title: 'Implement user authentication',
    description: 'Add login/logout functionality with JWT',
    status: 'pending',
    assignee: 'Alice',
    dueDate: '2025-08-05',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Fix dashboard layout bug',
    description: 'Resolve alignment issues in the dashboard view',
    status: 'completed',
    assignee: 'Bob',
    dueDate: '2025-08-01',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Write unit tests for API',
    description: 'Add Jest tests for the user and auth endpoints',
    status: 'pending',
    assignee: 'Charlie',
    dueDate: '2025-08-10',
    priority: 'low',
  },
  {
    id: 4,
    title: 'Deploy to staging server',
    description: 'Push latest changes to the staging environment',
    status: 'completed',
    assignee: 'Diana',
    dueDate: '2025-08-02',
    priority: 'medium',
  },
  {
    id: 5,
    title: 'Design database schema',
    description: 'Create schema for tasks and user roles in PostgreSQL',
    status: 'pending',
    assignee: 'Eve',
    dueDate: '2025-08-08',
    priority: 'high',
  },
  {
    id: 6,
    title: 'Optimize image loading',
    description: 'Improve performance by lazy-loading product images',
    status: 'completed',
    assignee: 'Frank',
    dueDate: '2025-08-03',
    priority: 'low',
  },
];

export const handlers = [
  http.post('/login', async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === 'test' && password === 'test123') {
      return HttpResponse.json({ token: 'fake-jwt-token' }, { status: 200 });
    }

    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }),

  http.get('/tasks', () => {
    return HttpResponse.json(tasks, { status: 200 });
  }),

  http.post('/tasks', async ({ request }) => {
    type TaskRequest = {
      title: string;
      description: string;
      status: 'pending' | 'completed';
      assignee: string;
      dueDate: string;
      priority: 'low' | 'medium' | 'high';
    };

    const body = (await request.json()) as TaskRequest;

    const newTask = {
      id: Date.now(),
      ...body,
    };

    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.put('/tasks/:id', async ({ params, request }) => {
    const updated = (await request.json()) as {
      id: number;
      title: string;
      description: string;
      status: 'pending' | 'completed';
      assignee: string;
      dueDate: string;
      priority: 'low' | 'medium' | 'high';
    };

    tasks = tasks.map((t) => (t.id === Number(params.id) ? updated : t));
    return HttpResponse.json(updated, { status: 200 });
  }),

  http.delete('/tasks/:id', ({ params }) => {
    tasks = tasks.filter((t) => t.id !== Number(params.id));
    return new HttpResponse(null, { status: 204 });
  }),
];
