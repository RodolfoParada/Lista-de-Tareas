// src/__tests__/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../App';

test('muestra el texto Hola Mundo', () => {
  render(<App />);
  expect(screen.getByText(/hola mundo/i)).toBeInTheDocument();
});
