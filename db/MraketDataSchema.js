const connect = require("./marketdata");
const mongoose = require("mongoose");

const marketdataschema = new mongoose.Schema({
  updated_date: { type: Date, unique: true },
  uploaded_time: String,
  arrival_date: String,
  total: Number,
  records: Array,
});
const market_price_data_model = new mongoose.model(
  "market_price_data",
  marketdataschema
);

module.exports = market_price_data_model;
