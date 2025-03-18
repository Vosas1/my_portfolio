// Import necessary dependencies
import React, { useEffect, useState } from "react"; // React and hooks for state management
import { getProperties } from "../api/propertyApi"; // Function to fetch properties from the API
import EditPropertyForm from "./EditPropertyForm"; // Import the edit form component
import "../App.css"; // Import CSS styles

// Define the PropertiesList functional component
const PropertiesList = () => {
  // State to store the list of properties
  const [properties, setProperties] = useState([]);
  // State to track which property is being edited
  const [editingProperty, setEditingProperty] = useState(null);
  // State for displaying success or error messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Can be "success" or "error"

  // Fetch properties when the component mounts
  useEffect(() => {
    fetchProperties();
  }, []); // Empty dependency array ensures it runs only once

  /**
   * Function to fetch properties from the backend API
   */
  const fetchProperties = async () => {
    try {
      const data = await getProperties(); // Fetch data from API
      setProperties(data); // Update state with fetched properties
    } catch (error) {
      setMessage("Failed to load properties.");
      setMessageType("error");
      clearMessage(); // Clear message after a few seconds
    }
  };

  /**
   * Function to delete a property from the database
   * @param {string} propertyNo - The unique ID of the property
   */
  const handleDelete = async (propertyNo) => {
    // Confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return; // Exit if user cancels

    try {
      const response = await fetch(`http://localhost:5000/api/properties/${propertyNo}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted property from the state to update UI
        setProperties(properties.filter(property => property.PROPERTYNO !== propertyNo));
        setMessage("Property deleted successfully.");
        setMessageType("success");
      } else {
        setMessage("Failed to delete property.");
        setMessageType("error");
      }
      clearMessage(); // Auto-hide message
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
      clearMessage();
    }
  };

  /**
   * Function to handle the edit button click
   * @param {object} property - The property object being edited
   */
  const handleEdit = (property) => {
    setEditingProperty(property); // Set the selected property for editing
  };

  /**
   * Function to handle saving the edited property
   * @param {object} updatedProperty - The updated property object
   */
  const handleSave = async (updatedProperty) => {
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${updatedProperty.PROPERTYNO}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // Ensure JSON format
        body: JSON.stringify(updatedProperty), // Convert object to JSON
      });

      if (response.ok) {
        // Update the property list with the modified property
        setProperties(
          properties.map((property) =>
            property.PROPERTYNO === updatedProperty.PROPERTYNO ? updatedProperty : property
          )
        );
        setEditingProperty(null); // Exit editing mode
        setMessage("Property updated successfully.");
        setMessageType("success");
      } else {
        setMessage("Failed to update property.");
        setMessageType("error");
      }
      clearMessage(); // Auto-hide message
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
      clearMessage();
    }
  };

  /**
   * Function to clear messages after 5 seconds
   */
  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000); // Auto-hide message after 5 seconds
  };

  return (
    <div className="property-container">
      <h2>Available Properties</h2>

      {/* Display success or error messages */}
      {message && <p className={`message ${messageType}`}>{message}</p>}

      {/* Show Edit Property Form if a property is being edited */}
      {editingProperty ? (
        <EditPropertyForm
          property={editingProperty} // Pass the property data to the edit form
          onSave={handleSave} // Function to save updates
          onCancel={() => setEditingProperty(null)} // Cancel editing
        />
      ) : (
        // Display the list of properties if no property is being edited
        <ul className="property-list">
          {properties.map((property) => (
            <li key={property.PROPERTYNO} className="property-item">
              <div className="property-item-content">
                <span>
                  <strong>{property.STREET}, {property.CITY}</strong> - {property.TYPE}, ${property.RENT}
                </span>
                <div>
                  {/* Edit button */}
                  <button className="edit-btn" onClick={() => handleEdit(property)}>Edit</button>
                  {/* Delete button */}
                  <button className="delete-btn" onClick={() => handleDelete(property.PROPERTYNO)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Export the PropertiesList component for use in other parts of the app
export default PropertiesList;
