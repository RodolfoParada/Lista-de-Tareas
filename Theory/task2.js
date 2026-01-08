// Task 2: Testing Básico de Componentes (7 minutos)
// Estructura fundamental para testing de componentes React.

// 🧪 Patrón Básico de Testing de Componentes
// Componente a testear:

// Counter.js
import { useState } from 'react';

function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrementar
      </button>
      <button onClick={() => setCount(initialValue)}>
        Reiniciar
      </button>
    </div>
  );
}

export default Counter;
// Tests unitarios del componente:

// Counter.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  test('muestra valor inicial correctamente', () => {
    render(<Counter initialValue={5} />);

    expect(screen.getByText('Contador: 5')).toBeInTheDocument();
  });

  test('incrementa contador al hacer click en botón', () => {
    render(<Counter />);

    const button = screen.getByRole('button', { name: /incrementar/i });
    fireEvent.click(button);

    expect(screen.getByText('Contador: 1')).toBeInTheDocument();
  });

  test('decrementa contador al hacer click en botón', () => {
    render(<Counter initialValue={5} />);

    const button = screen.getByRole('button', { name: /decrementar/i });
    fireEvent.click(button);

    expect(screen.getByText('Contador: 4')).toBeInTheDocument();
  });

  test('reinicia contador a valor inicial', () => {
    render(<Counter initialValue={10} />);

    // Incrementar primero
    fireEvent.click(screen.getByRole('button', { name: /incrementar/i }));

    // Luego reiniciar
    fireEvent.click(screen.getByRole('button', { name: /reiniciar/i }));

    expect(screen.getByText('Contador: 10')).toBeInTheDocument();
  });
});
// Concepto clave: Tests verifican comportamiento visible, no estado interno.

