import { CartActionType } from "./action.types";
import {
  addItemToCart,
  removeItemFromCart,
  filterCartItem,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionType.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActionType.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case CartActionType.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: filterCartItem(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default CartReducer;
