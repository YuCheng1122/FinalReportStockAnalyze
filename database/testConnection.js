const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "your_database_name",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Successfully connected to the database.");
});

connection.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Error executing query:", err.stack);
    return;
  }
  console.log("Query executed successfully:", results);
});

connection.end();
