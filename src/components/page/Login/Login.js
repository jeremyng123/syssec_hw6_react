import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [gotHoneyword, setGotHoneyword] = useState(false);
  const [gotSugarword, setGotSugarword] = useState(false);
  const [failed, setFailed] = useState(false);

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === "sugarword") {
          setGotSugarword(true);
        } else if (response.data === "honeyword") {
          setGotHoneyword(true);
        } else if (response.data === "failed") {
          setFailed(true);
        } else {
          setError(
            "Strange... none of the response returned the correct data..."
          );
        }
        return;
      })
      .catch((error) => {
        console.log("TODO: catch error", error.response);
        setError(JSON.stringify(error, null, 1));
        return error;
      });
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        {/* Error modal */}
        <Modal show={error != null}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{error != null ? error : null}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                setError(null);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* success banner, only shows if attained sugarword */}
        <Modal show={gotSugarword}>
          <Modal.Header>
            <Modal.Title>Logged in!</Modal.Title>
          </Modal.Header>
          <Modal.Body>User logged in!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setGotSugarword(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* success banner, only shows if attained sugarword */}
        <Modal show={gotHoneyword}>
          <Modal.Header>
            <Modal.Title>Logged in!</Modal.Title>
          </Modal.Header>
          <Modal.Body>User logged in! (admin alerted)</Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => setGotHoneyword(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* password not in sweetwords */}
        <Modal show={failed}>
          <Modal.Header>
            <Modal.Title>Wrong credentials?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Either the username or password is incorrect. please try again
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={() => setFailed(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <h3>Login</h3>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm}>
          Login
        </Button>
        <p className="register text-right">
          <a href="/register">Create account</a>
        </p>
        {/* <p className="forgot-password text-right">
              <a href="#">Forgot password?</a>
            </p> */}
      </Form>
    </div>
  );
}
