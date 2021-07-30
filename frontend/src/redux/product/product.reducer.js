import { ProductActionType } from "./action.type";

const INITIAL_STATE = {
  products: [],
  product: [],
  loading: false,
  error: undefined,
};

export const ProductReducer = (state = INITIAL_STATE, action) => {
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

export const ProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductActionType.PRODUCT_DELETE_START:
      return {
        loading: true,
      };
    case ProductActionType.PRODUCT_DELETE_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case ProductActionType.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const ProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductActionType.PRODUCT_CREATE_START:
      return {
        loading: true,
      };
    case ProductActionType.PRODUCT_CREATE_SUCCESS:
      return {
        success: true,
        loading: false,
        product: action.payload,
      };
    case ProductActionType.PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ProductActionType.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const ProductUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ProductActionType.PRODUCT_UPDATE_START:
      return {
        loading: true,
      };
    case ProductActionType.PRODUCT_UPDATE_SUCCESS:
      return {
        success: true,
        loading: false,
        product: action.payload,
      };
    case ProductActionType.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ProductActionType.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
// export default ProductReducer;
