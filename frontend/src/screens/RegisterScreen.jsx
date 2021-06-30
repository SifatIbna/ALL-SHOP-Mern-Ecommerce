import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import Message from "../component/Alert/Message";
import Loader from "../component/spinner/Loader";
import FormContainer from "../component/Form/Form.container";

import { RegisterRequestAsync } from "../redux/user/user.action";

const RegisterUser = ({ location, history }) => {
  const [userCredentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
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

    if (userCredentials.password !== userCredentials.confirmPassword) {
      setCredentials({
        ...userCredentials,
        message: "Password Do not match",
      });
    } else {
      dispatch(RegisterRequestAsync(userCredentials));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {userCredentials.message && (
        <Message variant="danger">{userCredentials.message}</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Enter Your Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={userCredentials.name}
            onChange={handleChange}
          />
        </Form.Group>

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

        <Form.Group controlId="confirmPassword">
          <Form.Label>ConfirmPassword</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={userCredentials.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterUser;
