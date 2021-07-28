import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/spinner/Loader";
import Message from "../component/Alert/Message";

import CheckoutSteps from "../component/checkout/CheckoutSteps";

import { orderRequestAsync } from "../redux/order/action";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.shipping);
  const { paymentMethod } = useSelector((state) => state.payment);
  const { order, error, loading, success } = useSelector(
    (state) => state.order
  );

  const shippingPrice = cartItems.length !== 0 ? Number(100) : 0;
  const cartItemTotalPrice =
    cartItems.length !== 0
      ? cartItems
          .reduce((acc, item) => acc + item.quantity * item.price, 0)
          .toFixed(2)
      : 0;
  const totalPrice = Number(shippingPrice) + Number(cartItemTotalPrice);

  useEffect(() => {
    if (success) {
      history.push(`order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      orderRequestAsync({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: Number(cartItemTotalPrice),
        shippingPrice: Number(shippingPrice),
        taxPrice: Number(0.05 * Number(cartItemTotalPrice)),
        totalPrice: Number(totalPrice),
      })
    );
  };

  return (
    <>
      {loading && <Loader />}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup value="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address},{shippingAddress.city},
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index + 1}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} ={" "}
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cartItemTotalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item
                className="btn btn-dark"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
