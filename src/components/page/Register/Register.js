import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const const_t = 4;

export default function Register() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [tail1, setTail1] = useState("");
  const [tail2, setTail2] = useState("");
  const [genPasswordType, setGenPasswordType] = useState(
    "chaffing-by-tweaking"
  );
  const [promptTail, setPromptTail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

  const validateForm = () => {
    return (
      username.length > 0 &&
      password1 === password2 &&
      password1.length > 0 &&
      !/[^a-zA-Z]/.test(password1)
    );
  };

  const validateTail = () => {
    return (
      tail1.length >= const_t &&
      tail1 === tail2 &&
      tail2.length >= const_t &&
      /^\d+$/.test(tail1)
    );
  };

  const promptUserForTail = () => {
    return setPromptTail(!promptTail);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPromptTail(false);

    const data = axios
      .post("http://localhost:5000/register", {
        username: username,
        password: password1,
        tail: tail1,
        genPasswordType: genPasswordType,
        t: tail1.length,
      })
      .then((response) => {
        setSuccess(true);
        return;
      })
      .catch((error) => {
        setError(JSON.stringify(error, null, 1));
        return error;
      });
  };

  return (
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

      {/* register password with tail */}
      <Modal show={promptTail}>
        <Modal.Header closeButton>
          <Modal.Title>Add tail to your password!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will be concatenated to your password. <br />
          <br />
          For example: password + 1234 = password1234
          <br />
          <br />
          <Form.Group>
            <Form.Label>Tail</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter tail of length 4"
              value={tail1}
              onChange={(e) => setTail1(e.target.value)}
            />
            <Form.Text className="text-muted">
              all numbers, at least length of 4
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmed Tail</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter tail again"
              value={tail2}
              onChange={(e) => setTail2(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            type="submit"
            size="lg"
            disabled={!validateTail()}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>

      {/* success banner, only shows if registration success */}
      <Modal show={success}>
        <Modal.Header>
          <Modal.Title>Logged in!</Modal.Title>
        </Modal.Header>
        <Modal.Body>User logged in!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              history.push({
                pathname: "/",
                state: { username: username },
              });
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h3>Register</h3>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          autoFocus
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          (Your password must be at least 8 characters long. Do not include
          numbers or symbols)
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirmed password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password again"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Check
          name="genPasswordType"
          type="radio"
          label="Chaffing-by-tweaking"
          value="chaffing-by-tweaking"
          onChange={(e) => setGenPasswordType(e.target.value)}
          defaultChecked
        />
        <Form.Check
          name="genPasswordType"
          type="radio"
          label="Chaffing-with-a-password-model"
          value="chaffing-with-a-password-model"
          onChange={(e) => setGenPasswordType(e.target.value)}
        />

        <Form.Check
          name="genPasswordType"
          type="radio"
          label="Hybrid"
          value="hybrid"
          onChange={(e) => setGenPasswordType(e.target.value)}
        />
      </Form.Group>

      <Button
        block
        size="lg"
        disabled={!validateForm()}
        onClick={promptUserForTail}
      >
        Register
      </Button>
      <p className="already-register text-right">
        Already registered <a href="/login">sign in?</a>
      </p>
    </Form>
  );
}
