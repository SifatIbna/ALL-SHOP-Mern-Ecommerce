import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";
import Rating from "../component/Rating/Rating.component";

import { fetchSingleProductAsync } from "../redux/product/product.action";
import Loader from "../component/spinner/Loader";
import Message from "../component/Alert/Message";

const ProductScreen = ({ history, match }) => {
  const [productAddons, setAddons] = useState({
    quantity: 1,
    color: "red",
    size: "regular",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProductAsync(match.params.id));
  }, [match.params.id, dispatch]);

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.id}?quantity=${productAddons.quantity}&color=${productAddons.color}&size=${productAddons.size}`
    );
  };

  const { product, loading, error } = useSelector((state) => state.product);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : ${product.description}
            </ListGroup.Item>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.length !== 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Available Sizes:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={productAddons.size}
                          onChange={(e) =>
                            setAddons({
                              ...productAddons,
                              size: e.target.value,
                            })
                          }
                        >
                          {product.size.map((value, index) => (
                            <option key={index + 1} value={value}>
                              {value}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                {product.length !== 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Available Colors:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={productAddons.color}
                          onChange={(e) =>
                            setAddons({
                              ...productAddons,
                              color: e.target.value,
                            })
                          }
                        >
                          {product.color.map((value, index) => (
                            <option key={index + 1} value={value}>
                              {value}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={productAddons.quantity}
                          onChange={(e) =>
                            setAddons({
                              ...productAddons,
                              quantity: e.target.value,
                            })
                          }
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (value) => (
                              <option key={value + 1} value={value + 1}>
                                {value + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item
                  onClick={addToCartHandler}
                  className="btn btn-dark"
                  disabled={product.countInStock === 0}
                >
                  ADD TO CART
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
