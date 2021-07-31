import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";

import Header from "./component/Header/Header.component";
import Footer from "./component/Footer/Footer.component";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserProfileScreen from "./screens/User.profile.screen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/productListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={UserProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route
            path="/admin/productList"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productList/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderList" component={OrderListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
