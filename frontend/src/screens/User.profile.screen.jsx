import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import Message from "../component/Alert/Message";
import Loader from "../component/spinner/Loader";

import { userUpdateProfileAsync } from "../redux/user/user.action";
import { GetMyOrdersAsync } from "../redux/order/action";

const UserProfileScreen = ({ location, history }) => {
  const [userCredentials, setCredentials] = useState({
    name: "",
    email: "",
    message: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);
  const { updatedUser, pending, updateError } = useSelector(
    (state) => state.update
  );
  const {
    orders,
    loading,
    error: getOrderListError,
  } = useSelector((state) => state.orderList);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push("/login");
    } else {
      dispatch(GetMyOrdersAsync());
      setCredentials({
        name: user.name,
        email: user.email,
        message: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [history, dispatch, user, updatedUser]);

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
      // UPDATE PROFILE
      dispatch(
        userUpdateProfileAsync({
          _id: user._id,
          name: userCredentials.name,
          email: userCredentials.email,
          password: userCredentials.password,
        })
      );
      setCredentials({
        ...userCredentials,
        message: "",
      });
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {userCredentials.message && (
          <Message variant="danger">{userCredentials.message}</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {/* {updateError === null && (
          <Message variant="success">Profile Updated</Message>
        )} */}
        {isLoading && <Loader />}
        {pending && <Loader />}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loading ? (
          <Loader />
        ) : getOrderListError ? (
          <Message variant="danger">{getOrderListError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserProfileScreen;
