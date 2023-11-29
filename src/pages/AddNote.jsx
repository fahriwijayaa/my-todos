import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addNote } from "../utils/network";
import "../App.css";

function AddTodo(props) {
  const navigate = useNavigate();
  const { username } = useParams();

  const [todo, setTodo] = useState({
    title: "",
    body: "",
  });

  function onSubmitHandler(event) {
    event.preventDefault();
    addNote(todo);
    console.log(todo);
    navigate(`/${username}`);
  }

  return (
    <div className="p-2">
      <strong className="fs-1 text-center text-light">Form Add Note</strong>
      <Form
        className="row g-3 m-5 text-light"
        onSubmit={(event) => {
          onSubmitHandler(event);
        }}
      >
        <Form.Group className="col-md-12 text-start">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(event) => {
              const value = event.target.value;
              setTodo({ ...todo, title: value });
            }}
            type="text"
            placeholder="Add Title"
            required
          />
        </Form.Group>
        <Form.Group className="col-12 text-start">
          <Form.Label>Body</Form.Label>
          <Form.Control
            onChange={(event) => {
              const value = event.target.value;
              setTodo({ ...todo, body: value });
            }}
            type="text"
            placeholder="Add Body"
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        {todo.title && todo.body ? (
          <Button
            className="col-2 btn-outline-primary position-relative start-50 translate-middle-x"
            variant="light"
            type="submit"
          >
            Create
          </Button>
        ) : (
          <Button
            className="col-2 btn-outline-danger position-relative start-50 translate-middle-x"
            variant="light"
            type="submit"
            disabled
          >
            Create
          </Button>
        )}
      </Form>
    </div>
  );
}

export default AddTodo;
