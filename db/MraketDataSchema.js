const connect = require("./marketdata");
const mongoose = require("mongoose");

const marketdataschema = new mongoose.Schema({
  updated_date: Date,
  arrival_date: String,
  total: Number,
  records: Array,
});
const market_price_data_model = new mongoose.model(
  "market_price_datatest",
  marketdataschema
);

module.exports = market_price_data_model;
