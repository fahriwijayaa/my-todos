import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNotes,
  deleteAccessToken,
  getUserLogged,
  deleteNote,
} from "../utils/network";
import NoteList from "../components/NoteList";
import profile from "../assets/profile.png";
import user from "../assets/user.png";
import logout from "../assets/logout.png";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const { username } = useParams();

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const onDeleteHandler = async (id) => {
    const deleteResult = await deleteNote(id);

    if (!deleteResult.error) {
      // Jika penghapusan berhasil, jalankan getNotes kembali
      const getNotesResult = await getNotes();

      if (!getNotesResult.error) {
        setNotes(getNotesResult.data);
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
    const isConfirmed = window.confirm("Apakah Anda yakin?");
    if (isConfirmed) {
      deleteAccessToken();
      navigate("/");
    }
  }

  async function onProfileHandler(event) {
    event.preventDefault();
    const response = await getUserLogged();
    console.log(response);
    navigate(`/${username}/profile`);
  }

  useEffect(() => {
    getNotes()
      .then((result) => {
        const data = result.data;
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(search.toLowerCase());
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
                Profile <img src={user} alt="Profile" width="25" height="25" />
              </button>
            </li>
            <li>
              <button
                onClick={(event) => {
                  onLogoutHandler(event);
                }}
              >
                Logout <img src={logout} alt="Profile" width="25" height="25" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="p-5 px-3">
        <strong className="p-5 fs-1 text-light">Note List</strong>
        <br />
        <Button
          className="d-flex mb-2 btn-outline-primary text-center"
          variant="light"
          type="submit"
          onClick={() => {
            navigate(`/${username}/add`);
          }}
        >
          Add Note
        </Button>
        <div>
          <NoteList notes={filteredNotes} onDelete={onDeleteHandler} />
        </div>
      </div>
    </>
  );
}

export default Home;
