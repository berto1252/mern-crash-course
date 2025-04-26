import express from "express"; // Import the express framework for building web applications in Node.js
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file into process.env
import { connectDB } from "./config/db.js"; // Import the function to connect to MongoDB from your config folder
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config(); // call the dotenv config function to initialize

const app = express(); // create an Express app instance
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/products",productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Start the server on port 3000
app.listen(PORT, () => { //listen for a port
    connectDB(); //establish connection to MongoDB database
    console.log("Server started at http://localhost:"+ PORT); //log a message to indicate server is running
});
