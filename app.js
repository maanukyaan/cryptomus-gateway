import express from "express";
// const { DatabaseService } = require("./database/database.service");
import CryptomusService from "./crytpomus/cryptomus.service.mjs";

const app = express();
const port = 3000; // Порт, на котором будет работать ваш сервер

const APIKey =
  "pwHpGDw8V1A4TWa66jjzikUsgmzsmFcdh7TwwOIH3NCFQZWWSfq34PtSdMcJn3gYy1LbAnX8ZJCkQxF8BWY0nkMUiyJExrAdqCvPEOa7INVf4HxVy4Yu37lA3vPjPc2X";
const merchantId = "f8396565-16a1-4bf2-b47c-0cae09817b23";

async function startServer() {
  // const db = new DatabaseService();
  // await db.init();

  const cryptomusService = new CryptomusService(APIKey, merchantId);

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
      res.send("Error!");
      return;
    }

    console.log(response);

    // await db.payment.create({
    //   data: {
    //     uuid: response.result.uuid,
    //     orderId: response.result.order_id,
    //     status: response.result.status,
    //     amount: response.result.amount,
    //     paymentAmount: response.result.paymentAmount,
    //     isFinal: response.result.is_final,
    //     url: response.result.url,
    //   },
    // });

    res.redirect(response.result.url);
  });

  // Запуск сервера
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}

startServer();
