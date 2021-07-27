import ShippingActionType from "./actions.type";

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: ShippingActionType.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
