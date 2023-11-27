import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/network";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitHandler(event) {
    event.preventDefault();
    // TODO HANDLE LOGIN HERE
    const response = await login({ username, password });
    if (response?.data?.token) {
      putAccessToken(response.data.token);
      navigate(`/${username}`);
    }
  }

  return (
    <div className="p-2">
      <strong className="fs-1 text-center text-light">Sign In</strong>
      <Form
        className="row px-5 g-3 m-5 text-light"
        onSubmit={(event) => {
          onSubmitHandler(event);
        }}
      >
        <Form.Group className="row-md-6 text-start">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </Form.Group>
        <Form.Group className="row-md-6 text-start">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <Form.Group>
          {username && password ? (
            <Button
              className="col-2 mb-1 btn-outline-primary"
              variant="light"
              type="submit"
            >
              Submit
            </Button>
          ) : (
            <Button
              className="col-2 mb-1 btn-outline-danger"
              variant="light"
              type="submit"
              disabled
            >
              Submit
            </Button>
          )}
        </Form.Group>
        <div className="line"></div>
        <Form>
          <Button
            className="col-2 mb-3 btn-outline-success"
            variant="light"
            type="submit"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </Form>
      </Form>
    </div>
  );
}

export default Login;
