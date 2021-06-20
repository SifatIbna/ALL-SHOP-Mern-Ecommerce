const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const products = require("./data/Product.data");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.send(product);
});

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
