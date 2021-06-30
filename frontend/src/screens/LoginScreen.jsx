import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import Message from "../component/Alert/Message";
import Loader from "../component/spinner/Loader";
import FormContainer from "../component/Form/Form.container";

import { LoginRequestAsync } from "../redux/user/user.action";

const LoginScreen = ({ location, history }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { user, isLoading, error } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginRequestAsync(userCredentials));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter Email"
            value={userCredentials.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter Password"
            value={userCredentials.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
