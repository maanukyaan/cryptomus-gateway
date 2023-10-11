const { Subsubcategory } = require("../models/models");

class SubsubcategoryController {
  async create(req, res) {
    const {
      subcategory_id,
      subsubcategory_name,
      price,
      card_description,
      product_description,
    } = req.body;
    const subsubcategory = await Subsubcategory.create({
      subcategory_id,
      subsubcategory_name,
      price,
      card_description,
      product_description,
    });
    return res.json(subsubcategory);
  }

  async getAll(req, res) {
    const categories = await Subsubcategory.findAll();
    return res.json(categories);
  }
}

module.exports = new SubsubcategoryController();
