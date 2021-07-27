import PaymentActionType from "./actions.type";

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: PaymentActionType.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentType", JSON.stringify(data));
};
