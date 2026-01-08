Practical exercise to apply the concepts learned.
🛠️ Implementación Práctica
Crea tests completos para componentes React:

Configurar React Testing Library

Instalar dependencias necesarias
Configurar jest-dom matchers
Crear setup inicial
Testing de Componentes Simples

Tests para botones y elementos interactivos
Verificación de props y estado inicial
Testing de diferentes variantes
Testing de Formularios

Validación de campos requeridos
Mensajes de error apropiados
Envío exitoso con datos correctos
Testing de Hooks Personalizados

Lógica compleja en hooks
Estados derivados y cálculos
Efectos secundarios controlados
Snapshot Testing

Detección de cambios visuales
Actualización controlada de snapshots
Exclusión de elementos dinámicos
Ejercicio: Implementa tests completos para un componente de "Lista de Tareas" que incluya agregar, completar, eliminar tareas y filtrado por estado.

Requerimientos:
# Instalar React Testing Library
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event @testing-library/react-hooks

# Configurar jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};

// src/setupTests.js
import '@testing-library/jest-dom';