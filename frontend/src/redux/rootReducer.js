import { combineReducers } from "redux";

import ProductReducer from "./product/product.reducer";
import CartReducer from "./cart/cart.reducer";
import UserReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
  user: UserReducer,
});

export default rootReducer;
