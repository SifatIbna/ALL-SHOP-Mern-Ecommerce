import CartActionType from "./actions.type";

const INITIAL_STATE = {
  shippingAddress: "",
};

const ShippingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionType.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};

export default ShippingReducer;
