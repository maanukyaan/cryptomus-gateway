require("dotenv").config();
const config = require("platformsh-config").config();
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

const CryptomusService = require("./modules/crytpomus/cryptomus.service.js");
const CronService = require("./modules/cron/cron.service.js");

const APIKey =
  "G3r3iagshze48CS24pKLwF7OGjz6bCmOgrSZsp4Klp0wkZuoNOZduYDjdBOeNX9CyEwMgaR4wEhDhxwZYZR7KuQvJJJKntOpRFed0H07imaJCzcY31h8oTy400q3V4q0";
const merchantId = "f8396565-16a1-4bf2-b47c-0cae09817b23";

const PORT = process.env.SERVER_PORT || 7777;
// const PORT = config.port;

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

async function run() {
  const cryptomusService = new CryptomusService(APIKey, merchantId);
  const cronService = new CronService(cryptomusService);
  cronService.init();

  try {
    const options = {
      key: fs.readFileSync(__dirname + "/key.pem"),
      cert: fs.readFileSync(__dirname + "/certificate.pem"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`HTTPS SERVER STARTED ON PORT ${PORT}`);
    });

    app.use(bodyParser.json()); // Добавление middleware для обработки JSON-данных

    // Allow requests from 'https://localhost:3000'
    app.use(
      cors({
        origin: "https://localhost:3000",
      })
    );

    app.use((req, res, next) => {
      const allowedOrigins = [
        "https://localhost:3000",
        "https://localhost:5000",
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

    app.get("/api/getProducts/:db/:category/", async (req, res) => {
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

    app.post("/api/buy", async (req, res) => {
      // Доступ к данным из тела POST-запроса
      const postData = req.body;
      console.log("\n\n\n\nPOST DATA: ", postData, "\n\n\n\n");

      try {
        // await client.connect();

        // // Ваш код для выполнения запроса к MongoDB
        // data = await client
        //   .db(postData.category_name)
        //   .collection(postData.subcategory_name)
        //   .findOne({ name: postData.product_name });

        // if (!data) {
        //   res.status(404).json({ error: "Данные не найдены" });
        // } else {
        //   // Отправка ответа обратно клиенту
        //   res.status(200).json({
        //     data: data.products,
        //   });
        // }

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
      } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("api/add/products/:category/:subcategory", async (req, res) => {
      const loginAndPassword = req.body;
      console.log("Claimed login and password: ", loginAndPassword);

      const { category, subcategory } = req.params;
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
