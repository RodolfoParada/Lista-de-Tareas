import { renderHook, act } from "@testing-library/react";
import { useTodos } from "../hooks/useTodos";

describe("useTodos hook", () => {

  test("agrega una tarea", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Nueva tarea");
    });

    expect(result.current.todos).toHaveLength(1);
  });

  test("calcula tareas completadas", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Tarea");
      result.current.toggleTodo(result.current.todos[0].id);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

});
