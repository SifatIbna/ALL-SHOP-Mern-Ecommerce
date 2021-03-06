import axios from "axios";
import { ProductActionType } from "./action.type";

export const fetchProductListStart = () => ({
  type: ProductActionType.FETCH_PRODUCT_LIST_REQUEST_START,
});

export const fetchProductListAsync =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch(fetchProductListStart());
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch(fetchProductListSuccess(data));
    } catch (error) {
      // const errorMsg =
      //   error.response && error.message.data.message
      //     ? error.response.data.message
      //     : error.message;
      dispatch(fetchProductListFailure(error.message));
    }
  };

export const fetchTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ProductActionType.PRODUCT_TOP_REQ_START });
    const { data } = await axios.get("/api/products/top");
    dispatch({
      type: ProductActionType.PRODUCT_TOP_REQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // const errorMsg =
    //   error.response && error.message.data.message
    //     ? error.response.data.message
    //     : error.message;
    dispatch({
      type: ProductActionType.PRODUCT_TOP_REQ_FAIL,
      payload: error.message,
    });
  }
};

export const fetchProductListSuccess = (productList) => ({
  type: ProductActionType.PRODUCT_LIST_FETCH_SUCCESS,
  payload: productList,
});

export const fetchProductListFailure = (err) => ({
  type: ProductActionType.PRODUCT_LIST_FETCH_FAILURE,
  payload: err,
});

export const fetchSingleProductListStart = () => ({
  type: ProductActionType.SINGLE_PRODUCT_FETCH_START,
});

export const fetchSingleProductAsync = (id) => async (dispatch) => {
  try {
    dispatch(fetchSingleProductListStart());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(fetchSingleProductSuccess(data));
  } catch (error) {
    dispatch(fetchSingleProductFailure(error.message));
  }
};

export const fetchSingleProductSuccess = (product) => ({
  type: ProductActionType.SINGLE_PRODUCT_FETCH_SUCCESS,
  payload: product,
});

export const fetchSingleProductFailure = (error) => ({
  type: ProductActionType.SINGLE_PRODUCT_FETCH_FAILURE,
  payload: error,
});

export const deleteProductAsync = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_DELETE_START" });
    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
  } catch (error) {
    // const errorMsg =
    //   error.response && error.message.data.message
    //     ? error.response.data.message
    //     : error.message;
    dispatch({
      type: ProductActionType.PRODUCT_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export const ProductCreate = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_START" });
    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data });
  } catch (error) {
    // const errorMsg =
    //   error.response && error.message.data.message
    //     ? error.response.data.message
    //     : error.message;
    dispatch({
      type: ProductActionType.PRODUCT_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const productUpdate = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ProductActionType.PRODUCT_UPDATE_START,
    });

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: ProductActionType.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ProductActionType.PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductActionType.PRODUCT_CREATE_REVIEW_START,
      });

      const {
        user: { user },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: ProductActionType.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: ProductActionType.PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
