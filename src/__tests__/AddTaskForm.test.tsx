import { render, screen } from '@testing-library/react';
import AddTaskForm from '../components/AddTaskForm';
import { Provider } from 'react-redux';
import { store } from '../store';

test('renders Add Task button', () => {
  render(
    <Provider store={store}>
      <AddTaskForm />
    </Provider>
  );
  const button = screen.getByRole('button', { name: /add task/i });
  expect(button).toBeInTheDocument();
});
