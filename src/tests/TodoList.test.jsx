import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
import useTodos from "../hooks/useTodos";

jest.mock("../hooks/useTodos", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("TodoList Component", () => {
  const toggleTodoMock = jest.fn();
  const deleteTodoMock = jest.fn();

  beforeEach(() => {
    useTodos.mockReturnValue({
      todos: [{ id: 1, text: "Tarea 1", completed: false }],
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
    });
  });

  test("renderiza una tarea", () => {
    render(<TodoList />);
    expect(screen.getByText("Tarea 1")).toBeInTheDocument();
  });

  test("marca una tarea como completada", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Tarea 1"));
    expect(toggleTodoMock).toHaveBeenCalledWith(1);
  });

  test("elimina una tarea", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Eliminar"));
    expect(deleteTodoMock).toHaveBeenCalledWith(1);
  });
});
