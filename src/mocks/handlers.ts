import { http, HttpResponse } from 'msw';

let tasks = [
  { id: 1, title: 'Sample Task 1', description: 'This is a test task', status: 'pending'   },
  { id: 2, title: 'Sample Task 2', description: 'This is a test task', status: 'completed' },
  { id: 3, title: 'Sample Task 3', description: 'This is a test task', status: 'pending'   },
  { id: 4, title: 'Sample Task 4', description: 'This is a test task', status: 'completed' },
  { id: 5, title: 'Sample Task 5', description: 'This is a test task', status: 'pending' },
  { id: 6, title: 'Sample Task 6', description: 'This is a test task', status: 'completed' },
];

export const handlers = [
  http.post('/login', async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === 'test' && password === 'shiv1234') {
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
    };

const body = (await request.json()) as TaskRequest;

    const newTask = {
      id: Date.now(), // safely assign id separately
      ...body,
    };

    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.put('/tasks/:id', async ({ params, request }) => {
  const updated = await request.json() as {
    id: number;
    title: string;
    description: string;
    status: string;
  };

  tasks = tasks.map((t) => (t.id === Number(params.id) ? updated : t));
  return HttpResponse.json(updated, { status: 200 });
}),

  http.delete('/tasks/:id', ({ params }) => {
    tasks = tasks.filter((t) => t.id !== Number(params.id));
    return new HttpResponse(null, { status: 204 });
  }),
];
