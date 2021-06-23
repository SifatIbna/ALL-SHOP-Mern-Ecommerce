import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import { addToCartAsync } from "../redux/cart/action";

import Message from "../component/Alert/Message";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCartAsync(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  return (
    <Row>
      <Col md={8}></Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
