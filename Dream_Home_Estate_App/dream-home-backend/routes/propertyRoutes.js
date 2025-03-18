// Import Express to create API routes
const express = require('express');

// Create an Express Router to handle property-related routes
const router = express.Router();

// Import the Property Model that interacts with the database
const propertyModel = require('../models/propertyModel');

// Route: GET all properties from the database
router.get('/', async (req, res) => {
    try {
        const properties = await propertyModel.getAllProperties();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: "Error fetching properties" });
    }
});

// Route: POST a new property
router.post('/', async (req, res) => {
    try {
        const result = await propertyModel.addProperty(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error adding property" });
    }
});

// Route: Update a property by PROPERTYNO
router.put('/:propertyNo', async (req, res) => {
    try {
        const result = await propertyModel.updateProperty(req.params.propertyNo, req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ error: "Error updating property" });
    }
});

// Route: Delete a property by PROPERTYNO
router.delete('/:propertyNo', async (req, res) => {
    try {
        const result = await propertyModel.deleteProperty(req.params.propertyNo);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ error: "Error deleting property" });
    }
});

// Export the router so it can be used in `server.js`
module.exports = router;

