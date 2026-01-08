// Task 3: Simulación de Eventos del Usuario (8 minutos)
// Técnicas para simular interacciones realistas del usuario.

// 🎯 User Event vs Fire Event
// fireEvent (básico, limitado):

// ❌ Problemas con fireEvent
fireEvent.click(button); // Solo click básico
fireEvent.change(input, { target: { value: 'texto' } }); // Solo change básico

// No maneja interacciones complejas como:
// - Focus/blur automático
// - Eventos relacionados (mouseenter, etc.)
// - Secuencias de teclado realistas
userEvent (recomendado, realista):

import userEvent from '@testing-library/user-event';

// ✅ Simulación realista
const user = userEvent.setup();

await user.click(button); // Maneja focus, mouseenter, etc.
await user.type(input, 'usuario@ejemplo.com'); // Simula typing real
await user.keyboard('{Enter}'); // Simula tecla específica
await user.selectOptions(select, 'option-value'); // Para selects
// Concepto clave: userEvent simula interacciones como las haría un usuario real.

// 📝 Testing de Formularios Complejos
// Componente de formulario a testear:

// LoginForm.js
function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email requerido';
    if (!formData.password) newErrors.password = 'Contraseña requerida';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
// Tests del formulario:

// LoginForm.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('muestra errores de validación para campos vacíos', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(screen.getByText('Email requerido')).toBeInTheDocument();
    expect(screen.getByText('Contraseña requerida')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('llama onSubmit con datos válidos', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'usuario@ejemplo.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'usuario@ejemplo.com',
        password: 'password123'
      });
    });

    expect(screen.queryByText('Email requerido')).not.toBeInTheDocument();
    expect(screen.queryByText('Contraseña requerida')).not.toBeInTheDocument();
  });

  test('limpia errores al corregir campos', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    // Enviar formulario vacío
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Verificar errores
    expect(screen.getByText('Email requerido')).toBeInTheDocument();

    // Corregir campo
    await user.type(screen.getByLabelText(/email/i), 'usuario@ejemplo.com');

    // Enviar nuevamente
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Error debería desaparecer (solo falta password)
    expect(screen.queryByText('Email requerido')).not.toBeInTheDocument();
    expect(screen.getByText('Contraseña requerida')).toBeInTheDocument();
  });
});
// Concepto clave: Tests de formularios verifican validación, UX y comportamiento completo.