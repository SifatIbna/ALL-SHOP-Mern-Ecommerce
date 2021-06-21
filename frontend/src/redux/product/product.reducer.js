import { ProductActionType } from "./action.type";

const INITIAL_STATE = {
  products: [],
  product: [],
  loading: false,
  error: undefined,
};

const ProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionType.FETCH_PRODUCT_LIST_REQUEST_START:
    case ProductActionType.SINGLE_PRODUCT_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case ProductActionType.PRODUCT_LIST_FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case ProductActionType.SINGLE_PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case ProductActionType.PRODUCT_LIST_FETCH_FAILURE:
    case ProductActionType.SINGLE_PRODUCT_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
