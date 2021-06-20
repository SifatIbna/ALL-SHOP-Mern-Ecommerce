import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import colors from "colors";

import products from "./data/Product.data.js";

dotenv.config();

connectDB();

const app = express();
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Process running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow
      .bold
  );
});
