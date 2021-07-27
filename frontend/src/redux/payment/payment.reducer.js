import PaymentActionType from "./actions.type";

const INITIAL_STATE = {
  paymentMethod: "",
};

const PaymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaymentActionType.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export default PaymentReducer;
