import express from "express";
import mongoose from "mongoose";

import CryptomusService from "./crytpomus/cryptomus.service.mjs";
import CronService from "./cron/cron.service.mjs";

const app = express();
const PORT = 3000;

const APIKey =
  "G3r3iagshze48CS24pKLwF7OGjz6bCmOgrSZsp4Klp0wkZuoNOZduYDjdBOeNX9CyEwMgaR4wEhDhxwZYZR7KuQvJJJKntOpRFed0H07imaJCzcY31h8oTy400q3V4q0";
const merchantId = "f8396565-16a1-4bf2-b47c-0cae09817b23";

async function startServer() {
  const cryptomusService = new CryptomusService(APIKey, merchantId);
  const cronService = new CronService(cryptomusService).init();

  const mongoURL = "mongodb+srv://maanukyaan:Vahe_2004@fb.jbknqwu.mongodb.net/";
  mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
      console.log("Connected to MongoDB succesfully!\n");
    })
    .catch((err) => {
      console.log(err);
    });

  const faSchema = new mongoose.Schema(
    {
      type: String,
      data: String,
    },
    { collection: "FA" }
  );

  const fbSchema = new mongoose.Schema(
    {
      type: String,
      data: String,
    },
    { collection: "FB" }
  );

  const ffSchema = new mongoose.Schema(
    {
      type: String,
      data: String,
    },
    { collection: "FF" }
  );

  const FA = mongoose.model("FA", faSchema);
  const FB = mongoose.model("FB", fbSchema);
  const FF = mongoose.model("FF", ffSchema);

  // Обработчик для корневого URL
  app.get("/payment", async (req, res) => {
    const type = req.query.type;
    const country = req.query.country;

    const price =
      type === "FA" ? 20 : type === "FB" ? 50 : type === "FF" ? 100 : 0;

    const orderId = (
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
    ).toString();

    console.log(`API KEY: ${APIKey}`);
    console.log(`MERCHANT ID: ${merchantId}`);

    const response = await cryptomusService.createPayment(price, orderId);
    if (!response) {
      res.status(500).send("Error!");
      return;
    }

    console.log(response);

    res.redirect(response.result.url);
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`\nServer started on port ${PORT}!\n`);
  });
}

startServer();
