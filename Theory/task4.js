// Task 4: Testing de Hooks y Snapshot Testing (7 minutos)
// Técnicas avanzadas para hooks personalizados y detección de cambios visuales.

// 🪝 Testing de Hooks Personalizados
// Hook personalizado a testear:

// useCounter.js
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
    isEven: count % 2 === 0
  };
}
// Testing del hook con @testing-library/react-hooks:

// useCounter.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('inicializa con valor por defecto', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.isEven).toBe(true);
  });

  test('inicializa con valor personalizado', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
    expect(result.current.isEven).toBe(false);
  });

  test('incrementa contador', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
    expect(result.current.isEven).toBe(false);
  });

  test('decrementa contador', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
    expect(result.current.isEven).toBe(true);
  });

  test('reinicia contador', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
// Concepto clave: renderHook permite testear hooks independientemente de componentes.

// 📸 Snapshot Testing
// Uso básico de snapshots:

// Button.test.js
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('coincide con snapshot', () => {
    const { container } = render(
      <Button variant="primary" size="large">
        Guardar Cambios
      </Button>
    );

    // Crea __snapshots__/Button.test.js.snap
    expect(container.firstChild).toMatchSnapshot();
  });
});
// Snapshot generado automáticamente:

// Button.test.js.snap
exports[`Button coincide con snapshot 1`] = `
<button
  class="button button--primary button--large"
>
  Guardar Cambios
</button>
`;
// Concepto clave: Snapshots detectan cambios visuales no intencionales, pero requieren actualización manual cuando los cambios son intencionales.