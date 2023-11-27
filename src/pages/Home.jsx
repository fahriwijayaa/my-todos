import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNotes,
  deleteAccessToken,
  getUserLogged,
  deleteNote,
} from "../utils/network";
import TodoList from "../components/TodoList";
import profile from "../assets/profile.png";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const { username } = useParams();

  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const onDeleteHandler = async (id) => {
    const deleteResult = await deleteNote(id);

    if (!deleteResult.error) {
      // Jika penghapusan berhasil, jalankan getNotes kembali
      const getNotesResult = await getNotes();

      if (!getNotesResult.error) {
        setTodos(getNotesResult.data);
      } else {
        console.error(
          "Error fetching notes after deletion:",
          getNotesResult.code
        );
      }
    } else {
      console.error("Error deleting note:", deleteResult.code);
    }
  };

  function onLogoutHandler(event) {
    event.preventDefault();
    // TODO HANDLE LOGOUT HERE
    const isConfirmed = window.confirm("Apakah Anda yakin?");
    if (isConfirmed) {
      deleteAccessToken();
      navigate("/");
    }
  }

  async function onProfileHandler(event) {
    event.preventDefault();
    // TODO HANDLE LOGOUT HERE
    const response = await getUserLogged();
    console.log(response);
    navigate(`/${username}/profile`);
  }

  useEffect(() => {
    getNotes()
      .then((result) => {
        const data = result.data;
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const filteredTodos = todos.filter((todo) => {
    return todo.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <nav>
        <h3>
          Hello, <strong>{username}</strong>
        </h3>
        <input
          type="text"
          onChange={(event) => {
            handleChangeSearch(event);
          }}
          value={search}
          placeholder="Cari Berdasarkan Title..."
        />
        <div className="dropdown">
          <img src={profile} alt="Profile" width="40" height="40" />
          <ul className="dropdown-content">
            <li>
              <button
                onClick={(event) => {
                  onProfileHandler(event);
                }}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={(event) => {
                  onLogoutHandler(event);
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="p-5">
        <strong className="fs-1 text-light">Todo List</strong>
        <br />
        <Button
          className="d-flex mb-2 btn-outline-primary text-center"
          variant="light"
          type="submit"
          onClick={() => {
            navigate(`/${username}/add`);
          }}
        >
          Add Todo
        </Button>
        <div>
          <TodoList todos={filteredTodos} onDelete={onDeleteHandler} />
        </div>
      </div>
    </>
  );
}

export default Home;
