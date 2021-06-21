import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { fetchProductListAsync } from "../redux/product/product.action";

import Loader from "../component/spinner/Loader";
import Message from "../component/Alert/Message";
import Product from "../component/Product/Product.component";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductListAsync());
  }, [dispatch]);

  const productList = useSelector((state) => state.product);
  const { loading, error, products } = productList;
  console.log(products);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
