import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { fetchProductListAsync } from "../redux/product/product.action";

import Loader from "../component/spinner/Loader";
import Message from "../component/Alert/Message";
import Product from "../component/Product/Product.component";

import Paginate from "../component/Paginate/Paginate";
import ProductCarousel from "../component/Carousel/ProductCarousel";
import Meta from "../component/Meta/Meta";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductListAsync(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.product);
  const { loading, error, products, page, pages } = productList;

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          GO BACK
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
