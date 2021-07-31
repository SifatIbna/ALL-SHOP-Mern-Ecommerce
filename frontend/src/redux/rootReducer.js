import { combineReducers } from "redux";

import {
  ProductReducer,
  ProductDeleteReducer,
  ProductCreateReducer,
  ProductUpdateReducer,
  ProductReviewCreateReducer,
  TopProductRatedReducer,
} from "./product/product.reducer";
import CartReducer from "./cart/cart.reducer";
import {
  UserReducer,
  UserUpdateProfileReducer,
  userListReducer,
  UserDeleteReducer,
  //   userProfileUpdateAdmin,
  userDetailsReducer,
  UserUpdateReducer,
} from "./user/user.reducer";
import ShippingReducer from "./shipping/shipping.reducer";
import PaymentReducer from "./payment/payment.reducer";
import {
  OrderReducer,
  OrderDetailsReducer,
  OrderPayReducer,
  myOrderRequestReducer,
  OrderRequestReducer,
  OrderDeliverReducer,
} from "./order/order.reducer";

const rootReducer = combineReducers({
  topProduct: TopProductRatedReducer,
  productReviews: ProductReviewCreateReducer,
  productUpdate: ProductUpdateReducer,
  productCeate: ProductCreateReducer,
  product: ProductReducer,
  productDelete: ProductDeleteReducer,
  cart: CartReducer,
  user: UserReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: UserUpdateReducer,
  userDelete: UserDeleteReducer,
  update: UserUpdateProfileReducer,
  shipping: ShippingReducer,
  payment: PaymentReducer,
  order: OrderReducer,
  orderDetails: OrderDetailsReducer,
  orderPay: OrderPayReducer,
  orderList: myOrderRequestReducer,
  getAllOrder: OrderRequestReducer,
  orderDeliver: OrderDeliverReducer,
});

export default rootReducer;
