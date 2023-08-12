const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "19520116",
  database: "root",
});

module.exports = connection;
