import axios from "axios";
import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    success: false,
    error: null,
  };

  validateForm = () => {
    return (
      this.state.username.length > 0 &&
      this.state.password1 === this.state.password2 &&
      this.state.password1.length > 0
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = axios
      .post("http://localhost:5000/api/register", {
        username: this.state.username,
        password: this.state.password1,
      })
      .then((response) => {
        console.log("successful registration!");
        this.setState({ success: true });
        return;
      })
      .catch((error) => {
        console.log("TODO: catch error", error.response);
        this.setState({ error: JSON.stringify(error, null, 1) });
        return error;
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* Error modal */}
        <Modal show={this.state.error != null}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{this.state.error != null ? this.state.error : null}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={(event) => {
                this.setState({ error: null });
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* success banner, only shows if attained sugarword */}
        <Modal show={this.state.success}>
          <Modal.Header>
            <Modal.Title>Logged in!</Modal.Title>
          </Modal.Header>
          <Modal.Body>User logged in!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={(event) => {
                this.props.history.push({
                  pathname: "/",
                  state: { username: this.state.username },
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
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={this.state.password1}
            onChange={(e) => this.setState({ password1: e.target.value })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirmed password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            value={this.state.password2}
            onChange={(e) => this.setState({ password2: e.target.value })}
          />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!this.validateForm()}>
          Register
        </Button>
        <p className="already-register text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </Form>
    );
  }
}
