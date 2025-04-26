import mongoose from 'mongoose'; // Import mongoose to define schema and model

// Define the schema for a Product
const productSchema = new mongoose.Schema({
    name: {
        type: String,      // The name must be a string
        required: true     // This field is required
    },
    price: {
        type: Number,      // The price must be a number
        required: true     // This field is required
    },
    image: {
        type: String,      // The image must be a string (usually a URL)
        required: true     // This field is required
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields to the schema
});

// Create the Product model using the schema
const Product = mongoose.model('Product', productSchema);

// Export the model to use in other parts of the app
export default Product;
