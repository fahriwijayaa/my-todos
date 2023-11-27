import { TodoRow } from "./TodoRow";

function TodoList(props) {
  const { todos, onDelete } = props;

  return (
    <div>
      {todos.map((todo, index) => {
        // Convert the string date to a JavaScript Date object
        const createdAtDate = new Date(todo.createdAt);

        // Add one day to the date
        createdAtDate.setDate(createdAtDate.getDate() + 1);

        // Format the new date as a string (assuming YYYY-MM-DD format)
        const newCreatedAt = createdAtDate.toISOString().slice(0, 10);
        return (
          <TodoRow
            key={todo.id}
            no={index + 1}
            index={index}
            id={todo.id}
            title={todo.title}
            createdAt={newCreatedAt}
            onDelete={onDelete}
          >
            {todo.body}
          </TodoRow>
        );
      })}
    </div>
  );
}

export default TodoList;
