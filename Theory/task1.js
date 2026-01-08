// Task 1: Filosofía de React Testing Library (8 minutos)
// Comprensión de por qué RTL cambió completamente el testing de componentes React.

// 🎯 ¿Por qué React Testing Library en lugar de Enzyme?
// Problemas con testing tradicional (Enzyme):

// Testing de implementación: Tests que rompen con refactors innocuos
// Acceso directo al DOM: Tests que ignoran cómo usan los usuarios la app
// Estado interno: Tests que dependen de detalles de implementación
// Falsos positivos: Tests que pasan pero no reflejan uso real
// Enfoque de React Testing Library:

// Testing desde perspectiva del usuario
// Queries que simulan interacción real
// Enfoque en comportamiento, no implementación
// Tests más robustos y mantenibles
// Concepto clave: RTL no testa lo que hace el código, testa lo que experimenta el usuario.

// 🔍 Queries de RTL por Prioridad
// Jerarquía de queries (de más a menos recomendadas):

// 1. getByRole - Más accesible, semántico
const button = screen.getByRole('button', { name: /guardar/i });

// 2. getByLabelText - Para inputs con labels
const emailInput = screen.getByLabelText(/correo electrónico/i);

// 3. getByPlaceholderText - Solo si no hay label
const searchInput = screen.getByPlaceholderText('Buscar productos...');

// 4. getByText - Para texto visible
const title = screen.getByText('Mi Aplicación');

// 5. getByDisplayValue - Para inputs con valor específico
const input = screen.getByDisplayValue('usuario@ejemplo.com');

// ❌ Queries frágiles (evitar)
screen.getByTestId('custom-id'); // Solo como último recurso
// Concepto clave: Las queries de RTL guían hacia mejores prácticas de accesibilidad.