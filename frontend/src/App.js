import React from "react";

import { Container } from "react-bootstrap";

import Header from "./component/Header/Header.component";
import Footer from "./component/Footer/Footer.component";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome to ALL-SHOP</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
