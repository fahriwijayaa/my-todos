let array_todos = [
  {
    id: 1,
    title: "Tugas Pemrograman Web",
    description: "Membuat aplikasi todo dengan react js",
    createdAt: "05/11/2023",
  },
  {
    id: 2,
    title: "Tugas MSIB",
    description: "Mengerjakan Logbook harian",
    createdAt: "05/11/2023",
  },
  {
    id: 3,
    title: "Tugas MSIB",
    description: "Membuat project IP Server sebagai tugas akhir backend",
    createdAt: "05/11/2023",
  },
];

function getTodos() {
  return array_todos;
}

function deleteTodos(deleted_id) {
  array_todos = array_todos.filter((todo, index) => todo.id !== deleted_id);
}

function addTodo(todo) {
  array_todos = [...array_todos, todo];
}

export { getTodos, deleteTodos, addTodo };
