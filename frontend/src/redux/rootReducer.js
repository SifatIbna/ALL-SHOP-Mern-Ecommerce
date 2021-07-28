import { combineReducers } from "redux";

import ProductReducer from "./product/product.reducer";
import CartReducer from "./cart/cart.reducer";
import { UserReducer, UserUpdateProfileReducer } from "./user/user.reducer";
import ShippingReducer from "./shipping/shipping.reducer";
import PaymentReducer from "./payment/payment.reducer";
import {
  OrderReducer,
  OrderDetailsReducer,
  OrderPayReducer,
  myOrderRequestReducer,
} from "./order/order.reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
  user: UserReducer,
  update: UserUpdateProfileReducer,
  shipping: ShippingReducer,
  payment: PaymentReducer,
  order: OrderReducer,
  orderDetails: OrderDetailsReducer,
  orderPay: OrderPayReducer,
  orderList: myOrderRequestReducer,
});

export default rootReducer;
