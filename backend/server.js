import path from "path";
import express from "express";
import dotenv from "dotenv";
// import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";

import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
// console.log(__dirname);
const finalPath = path.join(__dirname, "\\uploads");
console.log(finalPath);
app.use("/uploads", express.static(path.join(__dirname, "\\uploads")));

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
