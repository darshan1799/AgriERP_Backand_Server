const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@marketprice.sfkf9.mongodb.net/AgriERP?retryWrites=true&w=majority&appName=Marketprice`
  )
  .then((data) => {
    console.log("DataBase Connected Successfully");
  })
  .catch((e) => {
    console.log("Error At The Time Database Connected");
  });
