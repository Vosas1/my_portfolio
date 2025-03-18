import axios from "axios"; // Import Axios for API requests

// Backend API base URL
const API_URL = "http://localhost:5000/api/properties";

/**
 * Fetch all properties from the backend API.
 * @returns {Array} List of properties.
 */
export const getProperties = async () => {
    try {
        // Send GET request to fetch all properties
        const response = await axios.get(API_URL);
        return response.data; // Return data from API
    } catch (error) {
        // Log error message if request fails
        console.error("Error fetching properties:", error.response?.data || error.message);
        throw error; // Rethrow error for handling in the UI
    }
};

/**
 * Add a new property to the database.
 * @param {Object} propertyData - Property data to be added.
 * @returns {Object} The newly added property data.
 */
export const addProperty = async (propertyData) => {
    try {
        // Send POST request to add a new property
        const response = await axios.post(API_URL, propertyData);
        return response.data; // Return newly added property data
    } catch (error) {
        // Log error message if request fails
        console.error("Error adding property:", error.response?.data || error.message);
        throw error; // Rethrow error for handling in the UI
    }
};

/**
 * Update an existing property in the database.
 * @param {Object} updatedProperty - Updated property data.
 * @returns {Object} The updated property data.
 */
export const updateProperty = async (updatedProperty) => {
    try {
        // Send PUT request to update a property
        const response = await axios.put(`${API_URL}/${updatedProperty.PROPERTYNO}`, updatedProperty);
        return response.data; // Return updated property data
    } catch (error) {
        // Log error message if request fails
        console.error("Error updating property:", error.response?.data || error.message);
        throw error; // Rethrow error for handling in the UI
    }
};

/**
 * Delete a property from the database.
 * @param {string} propertyNo - The unique property number to delete.
 */
export const deleteProperty = async (propertyNo) => {
    try {
        // Send DELETE request to remove the property
        await axios.delete(`${API_URL}/${propertyNo}`);
    } catch (error) {
        // Log error message if request fails
        console.error("Error deleting property:", error.response?.data || error.message);
        throw error; // Rethrow error for handling in the UI
    }
};
