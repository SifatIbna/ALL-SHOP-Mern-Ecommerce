import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import colors from "colors";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(bodyParser.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Process running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow
      .bold
  );
});
