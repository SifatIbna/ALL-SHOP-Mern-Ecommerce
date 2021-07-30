import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//* @desc     Fetch all products
//* @route    GET /api/products
//* @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
});

//* @desc     Fetch single product
//* @route    GET /api/products/:id
//* @access   Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

//* @desc     Delete a single Product
//* @route    DELETE /api/products/:id
//* @access   Private

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

//* @desc     Delete a single Product
//* @route    DELETE /api/products/:id
//* @access   Private

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    image: "/images/sample.jpg",
    brand: "sample",
    category: "sample",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.brand = brand || product.brand;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
};
