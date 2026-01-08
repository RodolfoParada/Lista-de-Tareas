import useTodos from "../hooks/useTodos";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
