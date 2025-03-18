// Load environment variables from the .env file
require('dotenv').config();

// Import Express framework to create the server
const express = require('express');

// Import CORS to allow requests from different domains (useful for frontend integration)
const cors = require('cors');

// Import the database connection from the config folder
const db = require('./config/db');

// Create an instance of an Express application
const app = express();

// Define the port number (default to 5000 if not set in environment variables)
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Test Route - When visiting http://localhost:5000/ this message is displayed
app.get('/', (req, res) => {
    res.send('Dream Home Estate API is running...');
});

// Include the property API routes
app.use('/api/properties', require('./routes/propertyRoutes'));

// Function to start the server after ensuring the database is connected
async function startServer() {
    try {
        // Initialize database connection before starting the server
        await db.initialize();
       
        // Start the server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        // If an error occurs, log it to the console
        console.error('Error starting server:', error);
    }
}

// Call the function to start the server
startServer();

