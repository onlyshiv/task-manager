# Task Manager App (Frontend Only)

A polished, professional-looking **Task Management** app built using **React**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. This app simulates authentication and CRUD operations using **Mock Service Worker (MSW)** to fully mock backend interactions.

## Tech Stack

- **React** (Vite + TypeScript)
- **Redux Toolkit** for state management
- **Tailwind CSS** with **ShadCN UI** components
- **MSW (Mock Service Worker)** to simulate backend API
- **Dark mode** and modern UI with card layouts
- **Deployed using Vercel/Netlify** (to be updated)

## 📌 Features

- ✅ **Mock Login** and Logout functionality
- ✅ **Dashboard** with list of tasks
- ✅ **Add/Edit/Delete** tasks using dialog forms
- ✅ **Theme Toggle** (Dark/Light Mode)
- ✅ **Responsive UI** following modern design principles
- ✅ **MSW integration** to mock API calls
- ✅ **Task statuses**: Pending / Completed
- ✅ **Optimized UX** with error/empty/loading states

## Folder Structure

```
src/
├── components/         # Reusable UI components (AddTaskForm, EditTaskForm, ThemeToggle)
├── features/
│   ├── auth/           # Redux slice for auth
│   └── tasks/          # Redux slice for task CRUD
├── hooks/              # useAppDispatch, useAppSelector
├── mocks/              # MSW handlers and mock data
├── pages/              # Login and Dashboard pages
├── store.ts            # Redux store config
└── types.ts            # TypeScript interfaces for Task & Auth
```

## 📂 API Mocking (MSW)

MSW intercepts fetch/XHR requests and returns mock data:
- `POST /login` → returns fake user session
- `GET /tasks` → returns mocked task list
- `POST /tasks` → adds new task
- `PUT /tasks/:id` → updates a task
- `DELETE /tasks/:id` → deletes a task

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/task-manager-ui.git
cd task-manager-ui

# Install dependencies
yarn

# Start the development server
yarn dev
```

## 🔐 Authentication

Authentication is simulated using Redux state and MSW. No real backend involved.

## 📄 License

This project is for demo/case study purposes only.
