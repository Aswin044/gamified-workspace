const { Sequelize } = require("sequelize");
const path = require("path");

const DATABASE_URL = process.env.DATABASE_URL || null;

let sequelize;

if (DATABASE_URL && DATABASE_URL.startsWith("postgres")) {
  // Production: Postgres on Railway
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
    }
  });
  console.log("Using PostgreSQL database");
} else {
  // Local development: SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "database.sqlite"),
    logging: false
  });
  console.log("Using SQLite database");
}

module.exports = sequelize;
