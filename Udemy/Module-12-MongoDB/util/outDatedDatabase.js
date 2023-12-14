const mysql = require("mysql2");
//Connection Pool

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-app",
  password: "Simform@123",
});

module.exports = pool.promise();
