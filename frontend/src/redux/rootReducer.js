import { combineReducers } from "redux";

import ProductReducer from "./product/product.reducer";
import CartReducer from "./cart/cart.reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
});

export default rootReducer;
