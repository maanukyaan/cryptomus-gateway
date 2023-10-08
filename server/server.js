require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const router = require("./routes/index");

const sequelize = require("./db");
const models = require("./models/models");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server succesfully started on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error!");
  }
};

start();
