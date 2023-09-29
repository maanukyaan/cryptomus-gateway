import express from "express";
// const { DatabaseService } = require("./database/database.service");
import CryptomusService from "./crytpomus/cryptomus.service.mjs";
import CronService from "./cron/cron.service.mjs";

const app = express();
const port = 3000; // Порт, на котором будет работать ваш сервер

const APIKey =
  "G3r3iagshze48CS24pKLwF7OGjz6bCmOgrSZsp4Klp0wkZuoNOZduYDjdBOeNX9CyEwMgaR4wEhDhxwZYZR7KuQvJJJKntOpRFed0H07imaJCzcY31h8oTy400q3V4q0";
const merchantId = "f8396565-16a1-4bf2-b47c-0cae09817b23";

async function startServer() {
  // const db = new DatabaseService();
  // await db.init();

  const cryptomusService = new CryptomusService(APIKey, merchantId);
  const cronService = new CronService(cryptomusService).init();

  // Обработчик для корневого URL
  app.get("/payment", async (req, res) => {
    const amount = req.query.amount;
    const orderId = (
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
    ).toString();

    console.log(`API KEY: ${APIKey}`);
    console.log(`MERCHANT ID: ${merchantId}`);

    const response = await cryptomusService.createPayment(amount, orderId);
    if (!response) {
      res.status(500).send("Error!");
      return;
    }

    console.log(response);

    res.redirect(response.result.url);
  });

  // Запуск сервера
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}

startServer();
