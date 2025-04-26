import express from 'express'; // Import Express to use its Router functionality

// Import the controller functions for product operations
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

// Create a new router instance
const router = express.Router();

// Export the router to be used in other parts of the app (like server.js)
export default router;

// Define the route to get all products (GET /api/products)
router.get("/", getProducts);

// Define the route to create a new product (POST /api/products)
router.post("/", createProduct);

// Define the route to update an existing product by ID (PUT /api/products/:id)
router.put("/:id", updateProduct);

// Define the route to delete a product by ID (DELETE /api/products/:id)
router.delete("/:id", deleteProduct);
