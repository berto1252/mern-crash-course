import mongoose from 'mongoose'; // Import the mongoose library to connect and interact with MongoDB.

export const connectDB = async () => {
    try{
        // Attempt to connect to MongoDB using the connection string from the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Log a success message if the connection is established
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        // Log the error to the console if the connection fails
        console.error(err);
        // Exit the process with an error message — but this line has a small mistake
        process.exit(`Error: ${err.message}`);
        // This line exits the process with a failure code (1 means failure)
        process.exit(1);

    }
}