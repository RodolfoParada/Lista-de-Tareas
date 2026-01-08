import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../components/TodoForm";
import useTodos from "../hooks/useTodos";

jest.mock("../hooks/useTodos", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Formulario de creación de tareas", () => {
  const addTodoMock = jest.fn();

  beforeEach(() => {
    useTodos.mockReturnValue({
      todos: [],
      addTodo: addTodoMock,
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    });
  });

  test("renderiza el campo y el botón", () => {
    render(<TodoForm />);
    expect(screen.getByPlaceholderText("Nueva tarea")).toBeInTheDocument();
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  test("no permite enviar una tarea vacía", () => {
    render(<TodoForm />);
    fireEvent.click(screen.getByText("Agregar"));
    expect(addTodoMock).not.toHaveBeenCalled();
  });

  test("agrega una tarea válida", () => {
    render(<TodoForm />);
    fireEvent.change(screen.getByPlaceholderText("Nueva tarea"), {
      target: { value: "Nueva tarea" },
    });
    fireEvent.click(screen.getByText("Agregar"));
    expect(addTodoMock).toHaveBeenCalledWith("Nueva tarea");
  });
});
