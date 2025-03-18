require('dotenv').config();
const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  connectString: process.env.DB_CONNECT_STRING || 'localhost/XEPDB1'
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connected to Oracle Database');
  } catch (err) {
    console.error('Database Connection Error:', err);
  }
}

async function close() {
  try {
    await oracledb.getPool().close();
    console.log('Database Connection Closed');
  } catch (err) {
    console.error('Error Closing Database:', err);
  }
}

module.exports = { initialize, close, oracledb };

