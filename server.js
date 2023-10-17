require("dotenv").config();
const config = require("platformsh-config").config();

const express = require("express");
const bodyParser = require("body-parser");

const crypto = require("node:crypto");
const cron = require("node-cron");
const axios = require("axios");

class CryptomusService {
  apiKey;
  merchantId;

  constructor(apiKey, merchantId) {
    this.apiKey = apiKey;
    this.merchantId = merchantId;
  }

  getHeader(payload) {
    const sign = crypto
      .createHash("md5")
      .update(Buffer.from(payload).toString("base64") + this.apiKey)
      .digest("hex");

    return {
      merchant: this.merchantId,
      sign,
    };
  }

  async createPayment(amount, orderId) {
    try {
      const payload = {
        amount: amount.toString(),
        currency: "USDT",
        order_id: orderId,
      };

      const { data } = await axios.post(
        "https://api.cryptomus.com/v1/payment",
        payload,
        {
          headers: this.getHeader(JSON.stringify(payload)),
        }
      );

      // Вернуть данные клиенту
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async checkPayment(uuid) {
    try {
      const payload = {
        uuid,
      };

      const { data } = await axios.post(
        "https://api.cryptomus.com/v1/payment/info",
        payload,
        {
          headers: this.getHeader(JSON.stringify(payload)),
        }
      );

      // Вернуть данные клиенту
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class CronService {
  constructor() {
    CryptomusService;
  }

  async init() {
    cron.schedule("*/5 * * * * *", async () => {
      const res = await this.CryptomusService.checkPayment(payment.uuid);

      if (!res) {
        console.log("Error in cron service");
      }

      if (res.result.is_final) {
        console.log("Payment succesfully!");
      }
    });
  }
}

const APIKey =
  "G3r3iagshze48CS24pKLwF7OGjz6bCmOgrSZsp4Klp0wkZuoNOZduYDjdBOeNX9CyEwMgaR4wEhDhxwZYZR7KuQvJJJKntOpRFed0H07imaJCzcY31h8oTy400q3V4q0";
const merchantId = "f8396565-16a1-4bf2-b47c-0cae09817b23";

const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_LINK;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const PORT = config.port;
const PORT = process.env.SERVER_PORT || 7777;

async function run() {
  try {
    app.listen(PORT, (err) => {
      err
        ? console.log(err)
        : console.log(`\nServer succesfully started on port ${PORT}\n`);
    });

    app.use(express.static("client/build"));
    app.use(bodyParser.json()); // Добавление middleware для обработки JSON-данных

    app.use((req, res, next) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://154.7.253.78:5000",
        "http://154.7.253.78",
        "https://valgoshop.com",
        "https://accspalace.com",
      ]; // Список разрешенных IP-адресов
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!\n");

    const cryptomusService = new CryptomusService(APIKey, merchantId);
    const cronService = new CronService(cryptomusService).init();

    app.get("/api/getCategories/:category", async (req, res) => {
      const { category } = req.params;

      try {
        await client.connect();

        // Ваш код для выполнения запроса к MongoDB
        const data = await client
          .db(category)
          .collection("collections")
          .find({})
          .toArray();

        if (data.length === 0) {
          res.status(404).json({ error: "Данные не найдены" });
        } else {
          res.status(200).json(data);
        }
      } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/getSubcategories/:db/:category/", async (req, res) => {
      const { db, category } = req.params;

      try {
        await client.connect();

        // Ваш код для выполнения запроса к MongoDB
        const data = await client
          .db(db)
          .collection(category)
          .find({})
          .toArray();

        if (data.length === 0) {
          res.status(404).json({ error: "Данные не найдены" });
        } else {
          res.status(200).json(data);
        }
      } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Обработка POST-запроса с данными от клиента
    app.post("/api/buy", async (req, res) => {
      // Доступ к данным из тела POST-запроса
      const postData = req.body;
      let data;
      console.log(postData);

      const price = postData.price;

      const orderId = (
        Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
      ).toString();

      const response = await cryptomusService.createPayment(price, orderId);
      if (!response) {
        res.status(500).send("Error!");
        return;
      }

      res.redirect(response.result.url);

      // try {
      //   await client.connect();

      //   // Ваш код для выполнения запроса к MongoDB
      //   data = await client
      //     .db(postData.category_name)
      //     .collection(postData.subcategory_name)
      //     .findOne({ name: postData.product_name });

      //   if (!data) {
      //     res.status(404).json({ error: "Данные не найдены" });
      //   } else {
      //     // Отправка ответа обратно клиенту
      //     res.status(200).json({
      //       data: data.products,
      //     });
      //   }
      // } catch (error) {
      //   console.error("Error handling request:", error);
      //   res.status(500).json({ error: "Internal Server Error" });
      // }
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
