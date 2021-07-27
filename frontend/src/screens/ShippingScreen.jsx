import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import FormContainer from "../component/Form/Form.container";

import CheckoutSteps from "../component/checkout/CheckoutSteps";
import { saveShippingAddress } from "../redux/shipping/action";

const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.shipping);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Enter Your Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter Your address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Enter Your City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="Enter Your city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Enter Your postalCode</Form.Label>
          <Form.Control
            name="postalCode"
            type="text"
            placeholder="Enter Your postalCode"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Enter Your country</Form.Label>
          <Form.Control
            name="country"
            type="text"
            placeholder="Enter Your country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
