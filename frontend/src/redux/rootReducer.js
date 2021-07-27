import { combineReducers } from "redux";

import ProductReducer from "./product/product.reducer";
import CartReducer from "./cart/cart.reducer";
import { UserReducer, UserUpdateProfileReducer } from "./user/user.reducer";
import ShippingReducer from "./shipping/shipping.reducer";
import PaymentReducer from "./payment/payment.reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
  user: UserReducer,
  update: UserUpdateProfileReducer,
  shipping: ShippingReducer,
  payment: PaymentReducer,
});

export default rootReducer;
