import axios from "axios";
import { CartActionType } from "./action.types";

export const addItem = (item) => ({
  type: CartActionType.ADD_ITEM_TO_CART,
  payload: item,
});

export const clearItemFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: CartActionType.CLEAR_ITEM_FROM_CART,
    payload: item,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// export const clearItemFromCart = (item) => ({
//   type: CartActionType.CLEAR_ITEM_FROM_CART,
//   payload: item,
// });

export const addToCartAsync = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch(addItem({ ...data, quantity: quantity }));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
