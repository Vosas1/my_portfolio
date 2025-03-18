import React, { useState } from "react";
import { addProperty } from "../api/propertyApi"; // Import API function
import "../styles/formStyles.css"; // Import CSS for styling

const AddPropertyForm = ({ onPropertyAdded }) => {
  // State to store form inputs
  const [property, setProperty] = useState({
    PROPERTYNO: "",
    STREET: "",
    CITY: "",
    POSTCODE: "",
    TYPE: "",
    ROOMS: "",
    RENT: "",
    OWNERNO: "",
    STAFFNO: "",
    BRANCHNO: "",
    PICTURE: "",
    FLOORPLAN: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Handle input changes
  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if required fields are empty
    if (
      !property.PROPERTYNO ||
      !property.STREET ||
      !property.CITY ||
      !property.POSTCODE ||
      !property.TYPE ||
      !property.ROOMS ||
      !property.RENT ||
      !property.OWNERNO ||
      !property.STAFFNO ||
      !property.BRANCHNO
    ) {
      setErrorMessage("All required fields must be filled.");
      return;
    }

    try {
      await addProperty(property); // Send data to API
      onPropertyAdded(); // Refresh property list after adding
      setSuccessMessage("Property added successfully!"); // Show success message
      setErrorMessage(""); // Clear any error message

      // Clear the form fields after submission
      setProperty({
        PROPERTYNO: "",
        STREET: "",
        CITY: "",
        POSTCODE: "",
        TYPE: "",
        ROOMS: "",
        RENT: "",
        OWNERNO: "",
        STAFFNO: "",
        BRANCHNO: "",
        PICTURE: "",
        FLOORPLAN: "",
      });

      // Hide the success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding property:", error);
      setErrorMessage("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="add-form-container">
      {/* Display success or error messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <h2>Add New Property</h2>

        <label>Property Number</label>
        <input
          type="text"
          name="PROPERTYNO"
          value={property.PROPERTYNO}
          onChange={handleChange}
          required
        />

        <label>Street</label>
        <input
          type="text"
          name="STREET"
          value={property.STREET}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="CITY"
          value={property.CITY}
          onChange={handleChange}
          required
        />

        <label>Postcode</label>
        <input
          type="text"
          name="POSTCODE"
          value={property.POSTCODE}
          onChange={handleChange}
          required
        />

        <label>Type (e.g., Apartment, House)</label>
        <input
          type="text"
          name="TYPE"
          value={property.TYPE}
          onChange={handleChange}
          required
        />

        <label>Rooms</label>
        <input
          type="number"
          name="ROOMS"
          value={property.ROOMS}
          onChange={handleChange}
          required
        />

        <label>Rent</label>
        <input
          type="number"
          name="RENT"
          value={property.RENT}
          onChange={handleChange}
          required
        />

        <label>Owner Number</label>
        <input
          type="text"
          name="OWNERNO"
          value={property.OWNERNO}
          onChange={handleChange}
          required
        />

        <label>Staff Number</label>
        <input
          type="text"
          name="STAFFNO"
          value={property.STAFFNO}
          onChange={handleChange}
          required
        />

        <label>Branch Number</label>
        <input
          type="text"
          name="BRANCHNO"
          value={property.BRANCHNO}
          onChange={handleChange}
          required
        />

        <label>Picture URL</label>
        <input
          type="text"
          name="PICTURE"
          value={property.PICTURE}
          onChange={handleChange}
        />

        <label>Floor Plan URL</label>
        <input
          type="text"
          name="FLOORPLAN"
          value={property.FLOORPLAN}
          onChange={handleChange}
        />

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
