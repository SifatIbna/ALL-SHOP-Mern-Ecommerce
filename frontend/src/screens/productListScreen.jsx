import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";

import Message from "../component/Alert/Message";
import Loader from "../component/spinner/Loader";

import Paginate from "../component/Paginate/Paginate";

import {
  fetchProductListAsync,
  deleteProductAsync,
  ProductCreate,
} from "../redux/product/product.action";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const { products, loading, error, pages, page } = useSelector(
    (state) => state.product
  );
  const {
    success,
    loading: loadingDelete,
    error: errorDelete,
  } = useSelector((state) => state.productDelete);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCeate);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: "PRODUCT_CREATE_REST" });
    if (user && user.isAdmin) {
      dispatch(fetchProductListAsync("", pageNumber));
    } else {
      history.push("/login");
    }
    if (successCreate && createdProduct) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    }
  }, [
    dispatch,
    history,
    user,
    success,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAsync(id));
    }
  };

  const createProducthandler = () => {
    dispatch(ProductCreate());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProducthandler}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
