import { OrderActionType } from "./action.type";

const INITIAL_STATE = {
  loading: false,
  order: null,
  error: null,
  success: null,
};

export const OrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionType.ORDER_REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_REQUEST_SUCEES:
      return {
        ...state,
        loading: false,
        order: action.payload,
        success: true,
      };
    case OrderActionType.ORDER_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const OrderDetailsReducer = (
  state = { loading: false, order: [], success: false, error: null },
  action
) => {
  switch (action.type) {
    case OrderActionType.ORDER_DETAIL_REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_DETAIL_REQUEST_SUCEES:
      return {
        ...state,
        loading: false,
        order: action.payload,
        success: true,
      };
    case OrderActionType.ORDER_DETAIL_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const OrderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case OrderActionType.ORDER_PAY_REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_PAY_REQUEST_SUCEES:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case OrderActionType.ORDER_PAY_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case OrderActionType.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const OrderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case OrderActionType.ORDER_DELIVER_REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_DELIVER_REQUEST_SUCEES:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case OrderActionType.ORDER_DELIVER_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case OrderActionType.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const myOrderRequestReducer = (
  state = { orders: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case OrderActionType.ORDER_LIST_MY_REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.ORDER_LIST_MY_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case OrderActionType.ORDER_LIST_MY_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const OrderRequestReducer = (
  state = { orders: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case OrderActionType.GET_ALL_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case OrderActionType.GET_ALL_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
