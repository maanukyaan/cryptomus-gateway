const mongoose = require("mongoose");

const reinstate_accounts_ari_2_line_schema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  card_description: String,
  product_description: String,
  products: Array
});
const reinstate_accounts_ari_2_line = mongoose.model(
  "reinstate_accounts_ari_2_line",
  reinstate_accounts_ari_2_line_schema
);

const double_reinstated_accounts_sari_3_line_schema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  card_description: String,
  product_description: String,
  products: [
    {
      login: String,
      password: String,
    },
  ],
});
const double_reinstated_accounts_sari_3_line = mongoose.connection.useDb("facebook_accounts").model(
  "double_reinstated_accounts_sari_3_line",
  double_reinstated_accounts_sari_3_line_schema
);

const high_limit_personal_ads_accounts_schema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  card_description: String,
  product_description: String,
  products: [
    {
      login: String,
      password: String,
    },
  ],
});
const high_limit_personal_ads_accounts = mongoose.connection.useDb("facebook_accounts").model(
  "high_limit_personal_ads_accounts",
  high_limit_personal_ads_accounts_schema
);

module.exports = {
  reinstate_accounts_ari_2_line,
  double_reinstated_accounts_sari_3_line,
  high_limit_personal_ads_accounts,
};
