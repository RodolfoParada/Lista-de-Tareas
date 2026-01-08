import { render } from "@testing-library/react";
import TodoList from "../components/TodoList";
import useTodos from "../hooks/useTodos";

jest.mock("../hooks/useTodos", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("snapshot del TodoList", () => {
  useTodos.mockReturnValue({
    todos: [{ id: 1, text: "Tarea snapshot", completed: false }],
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn(),
  });

  const { container } = render(<TodoList />);
  expect(container).toMatchSnapshot();
});
