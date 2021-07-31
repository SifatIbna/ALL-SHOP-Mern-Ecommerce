import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import Rating from "../component/Rating/Rating.component";

import {
  fetchSingleProductAsync,
  createProductReview,
} from "../redux/product/product.action";

import { ProductActionType } from "../redux/product/action.type";

import Loader from "../component/spinner/Loader";
import Message from "../component/Alert/Message";

const ProductScreen = ({ history, match }) => {
  const [productAddons, setAddons] = useState({
    quantity: 1,
    color: "red",
    size: "regular",
  });

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  const {
    user: userInfo,
    isLoading,
    error: userError,
  } = useSelector((state) => state.user);

  const {
    success,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state) => state.productReviews);

  useEffect(() => {
    if (success) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: ProductActionType.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(fetchSingleProductAsync(match.params.id));
  }, [match.params.id, dispatch, userInfo, success]);

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.id}?quantity=${productAddons.quantity}&color=${productAddons.color}&size=${productAddons.size}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

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
        product.length !== 0 && (
          <>
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
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
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
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer review</h2>
                    {reviewError && (
                      <Message variant="danger">{reviewError}</Message>
                    )}
                    {userInfo.length !== 0 ? (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
