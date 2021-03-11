import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export default class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <Form>
          <h3>Login</h3>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button block size="lg" type="submit" disabled={true}>
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
}
