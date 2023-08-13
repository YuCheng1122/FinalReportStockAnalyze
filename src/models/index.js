"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
require("dotenv").config(); // 加載 .env 文件中的環境變量

const db = {};

let sequelize;
if (env === "development") {
  sequelize = new Sequelize(
    process.env.DEV_DB_NAME,
    process.env.DEV_DB_USERNAME,
    process.env.DEV_DB_PASSWORD,
    {
      host: process.env.DEV_DB_HOST,
      dialect: process.env.DEV_DB_DIALECT,
    }
  );
} else if (env === "test") {
  sequelize = new Sequelize(
    process.env.TEST_DB_NAME,
    process.env.TEST_DB_USERNAME,
    process.env.TEST_DB_PASSWORD,
    {
      host: process.env.TEST_DB_HOST,
      dialect: process.env.TEST_DB_DIALECT,
    }
  );
} else if (env === "production") {
  sequelize = new Sequelize(
    process.env.PROD_DB_NAME,
    process.env.PROD_DB_USERNAME,
    process.env.PROD_DB_PASSWORD,
    {
      host: process.env.PROD_DB_HOST,
      dialect: process.env.PROD_DB_DIALECT,
    }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
