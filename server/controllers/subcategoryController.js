const { Subcategory } = require("../models/models");

class SubcategoryController {
  async create(req, res) {
    const { category_id, subcategory_name } = req.body;
    const subcategory = await Subcategory.create({ category_id, subcategory_name });
    return res.json(subcategory);
  }

  async getAll(req, res) {
    const categories = await Subcategory.findAll();
    return res.json(categories);
  }
}

module.exports = new SubcategoryController();
