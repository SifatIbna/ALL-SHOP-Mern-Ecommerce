import axios from "axios";
import { OrderActionType } from "./action.type";

export const OrderRequestStart = () => ({
  type: OrderActionType.ORDER_REQUEST_START,
});

export const orderRequestAsync = (order) => async (dispatch, getState) => {
  try {
    dispatch(OrderRequestStart());

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch(OrderRequestSuccess(data));
  } catch (err) {
    dispatch(OrderReuqestFailure(err.message));
  }
};

const OrderRequestSuccess = (data) => ({
  type: OrderActionType.ORDER_REQUEST_SUCEES,
  payload: data,
});

const OrderReuqestFailure = (message) => ({
  type: OrderActionType.ORDER_REQUEST_FAILED,
  payload: message,
});

export const OrderDetailsStart = () => ({
  type: OrderActionType.ORDER_DETAIL_REQUEST_START,
});

export const OrderDetialsSuccess = (data) => ({
  type: OrderActionType.ORDER_DETAIL_REQUEST_SUCEES,
  payload: data,
});

export const OrderDetailsFailure = (msg) => ({
  type: OrderActionType.ORDER_DETAIL_REQUEST_FAILED,
  payload: msg,
});

export const getOrderDetailsAsync = (id) => async (dispatch, getState) => {
  try {
    dispatch(OrderDetailsStart());

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch(OrderDetialsSuccess(data));
  } catch (err) {
    dispatch(OrderDetailsFailure(err.message));
  }
};

export const OrderPayRequestStart = () => ({
  type: OrderActionType.ORDER_PAY_REQUEST_START,
});

export const OrderPayRequestSuccess = () => ({
  type: OrderActionType.ORDER_PAY_REQUEST_SUCEES,
});

export const OrderPayRequestFailure = (msg) => ({
  type: OrderActionType.ORDER_PAY_REQUEST_FAILED,
  payload: msg,
});

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch(OrderPayRequestStart());

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );
    dispatch(OrderPayRequestSuccess(data));
  } catch (err) {
    dispatch(OrderPayRequestFailure(err.message));
  }
};
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: OrderActionType.ORDER_DELIVER_REQUEST_START });

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );
    dispatch({
      type: OrderActionType.ORDER_DELIVER_REQUEST_SUCEES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: OrderActionType.ORDER_DELIVER_REQUEST_FAILED,
      action: err.message,
    });
  }
};

export const GetMyOrdersStart = () => ({
  type: OrderActionType.ORDER_LIST_MY_REQUEST_START,
});

export const GetMyOrdersSuccess = (data) => ({
  type: OrderActionType.ORDER_LIST_MY_REQUEST_SUCCESS,
  payload: data,
});

export const GetMyOrdersFailure = (msg) => ({
  type: OrderActionType.ORDER_LIST_MY_REQUEST_FAILURE,
  payload: msg,
});

export const GetMyOrdersAsync = () => async (dispatch, getState) => {
  try {
    dispatch(GetMyOrdersStart());

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders/myorders`,

      config
    );
    dispatch(GetMyOrdersSuccess(data));
  } catch (err) {
    dispatch(GetMyOrdersFailure(err.message));
  }
};
export const GetOrdersAsync = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OrderActionType.GET_ALL_ORDER_START });

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders`,

      config
    );
    dispatch({ type: OrderActionType.GET_ALL_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: OrderActionType.GET_ALL_ORDER_FAIL });
  }
};
