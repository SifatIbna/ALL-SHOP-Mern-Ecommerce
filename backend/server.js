import express from "express";
import dotenv from "dotenv";
// import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import colors from "colors";
import cors from "cors";

import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();

connectDB();

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);

app.use(errorHandler);

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
