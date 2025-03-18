import React, { useState } from "react";
import "../App.css"; // Import styles

const EditPropertyForm = ({ property, onSave, onCancel }) => {
  // Initialize state with property details
  const [updatedProperty, setUpdatedProperty] = useState({ ...property });
  const [error, setError] = useState(""); // State for validation errors

  // Handle form input changes
  const handleChange = (e) => {
    setUpdatedProperty({ ...updatedProperty, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Ensure all fields are filled
    if (!updatedProperty.STREET || !updatedProperty.CITY || !updatedProperty.TYPE || !updatedProperty.RENT) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear error if validation passes
    onSave(updatedProperty);
  };

  return (
    <div className="edit-form-container">
      <h3>Edit Property</h3>
      {error && <p className="error-message">{error}</p>} {/* Display validation errors */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="STREET"
          value={updatedProperty.STREET}
          onChange={handleChange}
          placeholder="Street"
          required
        />
        <input
          type="text"
          name="CITY"
          value={updatedProperty.CITY}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="TYPE"
          value={updatedProperty.TYPE}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        <input
          type="number"
          name="RENT"
          value={updatedProperty.RENT}
          onChange={handleChange}
          placeholder="Rent"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPropertyForm;
