import axios from "axios";
import { ProductActionType } from "./action.type";

export const fetchProductListStart = () => ({
  type: ProductActionType.FETCH_PRODUCT_LIST_REQUEST_START,
});

export const fetchProductListAsync = () => async (dispatch) => {
  try {
    dispatch(fetchProductListStart());
    const { data } = await axios.get("http://192.168.0.107:5000/api/products");
    dispatch(fetchProductListSuccess(data));
  } catch (error) {
    // const errorMsg =
    //   error.response && error.message.data.message
    //     ? error.response.data.message
    //     : error.message;
    dispatch(fetchProductListFailure(error.message));
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
    const { data } = await axios.get(
      `http://192.168.0.107:5000/api/products/${id}`
    );
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
