import Product from "../models/product.model.js"; // Import the Product model
import mongoose from "mongoose"; // Import mongoose for working with MongoDB and ObjectId validation

// Get all products from the database
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all products from the database
        res.status(200).json({ success: true, data: products }); // Send back success response with data
    } catch (error) {
        console.log("error in fetching products:", error.message); // Log any error
        res.status(500).json({ success: false, message: "Server Error" }); // Send a server error response
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    const product = req.body; // Extract the product data from request body

    // Check if all required fields are present
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields"
        });
    }

    const newProduct = new Product(product); // Create a new product document

    try {
        await newProduct.save(); // Save the product to the database
        res.status(201).json({ success: true, data: newProduct }); // Send success response with new product
    } catch (error) {
        console.error("Error in Create product:", error.message); // Log the error
        res.status(500).json({ success: false, message: "Server Error" }); // Send server error response
    }
};

// Update an existing product
export const updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters
    const product = req.body; // Get the updated product data from request body

    // Validate that the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product ID"
        });
    }

    try {
        // Update the product and return the updated document (`new: true`)
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct }); // Send success response
    } catch (error) {
        console.log("error in updating product:", error.message); // Log the error
        res.status(500).json({ success: false, message: "Server Error" }); // Send server error response
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product ID"
        });
    }
        console.log("id:", id);

    try {
        await Product.findByIdAndDelete(id); // Find the product by ID and delete it
        res.status(200).json({ success: true, message: "Product deleted" }); // Send success response
    } catch (error) {
        console.log("error in deleting product:", error.message); // Log the error
        res.status(500).json({ success: false, message: "Server Error" }); // Send error response if product not found
    }
};
