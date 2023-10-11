const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Определение моделей
const Category = sequelize.define("Category", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Subcategory = sequelize.define("Subcategory", {
  subcategory_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
  },
  subcategory_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Subsubcategory = sequelize.define("Subsubcategory", {
  subsubcategory_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subcategory_id: {
    type: DataTypes.INTEGER,
  },
  subsubcategory_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card_description: {
    type: DataTypes.STRING,
  },
  product_description: {
    type: DataTypes.STRING,
  },
});

const Product = sequelize.define("Product", {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subsubcategory_id: {
    type: DataTypes.INTEGER,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Определение отношений между моделями
Category.hasMany(Subcategory, {
  foreignKey: "category_id",
  as: "subcategories",
});
Subcategory.hasMany(Subsubcategory, {
  foreignKey: "subcategory_id",
  as: "subsubcategories",
});
Subsubcategory.hasMany(Product, {
  foreignKey: "subsubcategory_id",
  as: "products",
});

// Определение обратных отношений
Subcategory.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});
Subsubcategory.belongsTo(Subcategory, {
  foreignKey: "subcategory_id",
  as: "subcategory",
});
Product.belongsTo(Subsubcategory, {
  foreignKey: "subsubcategory_id",
  as: "subsubcategory",
});

module.exports = {
  Category,
  Subcategory,
  Subsubcategory,
  Product,
  User,
};
