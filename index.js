const express = require("express");
const market_model = require("./db/MraketDataSchema");
const schedule = require("node-schedule");
require("dotenv").config();

const app = express();

const getPastDate = () => {
  const PastDate = new Date();
  PastDate.setDate(PastDate.getDate() - 1);
  return PastDate.toLocaleDateString();
};

const fetchData = async () => {
  const pastdate = getPastDate();
  const response = await fetch(
    `${process.env.API_URL}?api-key=${
      process.env.API_KEY
    }&format=json&limit=10000&filters%5BState.keyword%5D=Gujarat&filters%5BArrival_Date%5D=${getPastDate()}`
  );
  const data = await response.json();
  return (Market_Price_Obj = {
    updated_date: data.updated_date,
    arrival_date: pastdate,
    total: data.total,
    records: data.records,
  });
};
// app.get("/", async (req, res) => {
//   const market_price_data = await fetchData();
//   res.send(market_price_data);
// });

app.post("/", async (req, res) => {
  const market_price_data = await fetchData();
  try {
    const addadata = new market_model(market_price_data);
    const savedata = await addadata.save();
    res.send(savedata);
  } catch (e) {
    res.send(e.message);
  }
});

app.listen(process.env.PORT || 2000, () => {
  console.log(`server started at ${process.env.PORT} `);
});

//let date = new Date();
// const date = new Date();
// date.setHours(8, 46, 4);
// console.log(date.toLocaleString());
// schedule.scheduleJob(date, async () => {
//   const response = await fetch("http://localhost:2000/");
//   const data = await response.json();
//   console.log(data);
// });
