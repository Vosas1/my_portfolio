// Import the OracleDB connection object
const oracledb = require('../config/db').oracledb;

// Function to fetch all properties from the database
async function getAllProperties() {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT PROPERTYNO, STREET, CITY, TYPE, ROOMS, RENT, OWNERNO, STAFFNO, BRANCHNO, PICTURE, FLOORPLAN FROM DH_PROPERTYFORRENT`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return data as JSON
        );
        return result.rows;
    } catch (err) {
        console.error('Error fetching properties:', err);
        throw err;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

// Function to insert a new property into the database
async function addProperty(propertyData) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        // SQL Query to insert a new property (including POSTCODE)
        const sql = `
            INSERT INTO DH_PROPERTYFORRENT (PROPERTYNO, STREET, CITY, POSTCODE, TYPE, ROOMS, RENT, OWNERNO, STAFFNO, BRANCHNO, PICTURE, FLOORPLAN)
            VALUES (:propertyNo, :street, :city, :postcode, :type, :rooms, :rent, :ownerNo, :staffNo, :branchNo, :picture, :floorPlan)
        `;

        // Bind values from the request body
        const binds = {
            propertyNo: propertyData.PROPERTYNO,
            street: propertyData.STREET,
            city: propertyData.CITY,
            postcode: propertyData.POSTCODE,  // Added postcode
            type: propertyData.TYPE,
            rooms: propertyData.ROOMS,
            rent: propertyData.RENT,
            ownerNo: propertyData.OWNERNO,
            staffNo: propertyData.STAFFNO,
            branchNo: propertyData.BRANCHNO,
            picture: propertyData.PICTURE,
            floorPlan: propertyData.FLOORPLAN
        };

        // Execute query
        await connection.execute(sql, binds, { autoCommit: true });

        return { message: "Property added successfully!" };
    } catch (err) {
        console.error("Error adding property:", err);
        throw err;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}


// Function to update an existing property in the database
async function updateProperty(propertyNo, updatedData) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const sql = `
            UPDATE DH_PROPERTYFORRENT
            SET STREET = :street,
                CITY = :city,
                POSTCODE = :postcode,
                TYPE = :type,
                ROOMS = :rooms,
                RENT = :rent,
                OWNERNO = :ownerNo,
                STAFFNO = :staffNo,
                BRANCHNO = :branchNo,
                PICTURE = :picture,
                FLOORPLAN = :floorPlan
            WHERE PROPERTYNO = :propertyNo
        `;

        const binds = {
            propertyNo: propertyNo,
            street: updatedData.STREET,
            city: updatedData.CITY,
            postcode: updatedData.POSTCODE,
            type: updatedData.TYPE,
            rooms: Number(updatedData.ROOMS),
            rent: Number(updatedData.RENT),
            ownerNo: updatedData.OWNERNO,
            staffNo: updatedData.STAFFNO,
            branchNo: updatedData.BRANCHNO,
            picture: updatedData.PICTURE,
            floorPlan: updatedData.FLOORPLAN
        };

        const result = await connection.execute(sql, binds, { autoCommit: true });

        if (result.rowsAffected === 0) {
            return { message: "Property not found" };
        }

        return { message: "Property updated successfully!" };
    } catch (err) {
        console.error("Error updating property:", err);
        throw err;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

// Function to delete a property from the database
async function deleteProperty(propertyNo) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const sql = `DELETE FROM DH_PROPERTYFORRENT WHERE PROPERTYNO = :propertyNo`;

        const binds = { propertyNo };

        const result = await connection.execute(sql, binds, { autoCommit: true });

        if (result.rowsAffected === 0) {
            return { message: "Property not found" };
        }

        return { message: "Property deleted successfully!" };
    } catch (err) {
        console.error("Error deleting property:", err);
        throw err;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

// Export the function
module.exports = { getAllProperties, addProperty, updateProperty, deleteProperty };
