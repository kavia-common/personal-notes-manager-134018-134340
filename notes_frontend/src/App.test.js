import { render, screen } from '@testing-library/react';
import App from './App';

test('renders notes app with create form', () => {
  render(<App />);
  expect(screen.getByText(/Create a new note/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add Note/i })).toBeInTheDocument();
});
