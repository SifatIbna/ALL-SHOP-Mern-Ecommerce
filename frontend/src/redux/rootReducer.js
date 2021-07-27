import { combineReducers } from "redux";

import ProductReducer from "./product/product.reducer";
import CartReducer from "./cart/cart.reducer";
import { UserReducer, UserUpdateProfileReducer } from "./user/user.reducer";
import ShippingReducer from "./shipping/shipping.reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
  user: UserReducer,
  update: UserUpdateProfileReducer,
  shipping: ShippingReducer,
});

export default rootReducer;
