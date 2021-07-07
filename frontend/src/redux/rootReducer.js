import { combineReducers } from "redux";

import ProductReducer from "./product/product.reducer";
import CartReducer from "./cart/cart.reducer";
import { UserReducer, UserUpdateProfileReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
  user: UserReducer,
  update: UserUpdateProfileReducer,
});

export default rootReducer;
