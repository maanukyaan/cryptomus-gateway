const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductController {
  async crate(req, res) {
    const {name} = req.body;
  }

  async getAll(req, res) {
    res.json({ message: "Get all products" });
  }

  async getOne(req, res) {
    res.json({ message: "Get one product" });
  }
}

module.exports = new ProductController();
