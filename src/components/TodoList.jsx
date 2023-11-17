import { TodoRow } from "./TodoRow";

function TodoList(props) {
  const { todos, onDelete } = props;
  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <TodoRow
            key={todo.id}
            no={index + 1}
            index={index}
            id={todo.id}
            title={todo.title}
            createdAt={todo.createdAt}
            onDelete={onDelete}
          >
            {todo.description}
          </TodoRow>
        );
      })}
    </div>
  );
}

export default TodoList;
