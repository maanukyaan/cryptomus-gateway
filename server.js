require("dotenv").config();
const config = require("platformsh-config").config();

const express = require("express");
const cors = require("cors");

const crypto = require("crypto");
const axios = require("axios");

const nodemailer = require("nodemailer");

let PORT = process.env.SERVER_PORT || 7777;
// PORT = config.port;

const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongo_url = process.env.MONGO_LINK;
// Creating a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongo_url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    app.listen(PORT, (err) => {
      err
        ? console.log(err)
        : console.log(`\nServer succesfully started on port ${PORT}\n`);
    });

    app.use(
      express.json({
        verify: (req, res, buf) => {
          req.rawBody = buf.toString();
        },
      })
    ); // Middleware for reading JSON

    app.use((req, res, next) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://localhost:3000",
        "https://accspalace.com",
        "https://www.main-bvxea6i-ij5pctw5a4zt4.us-3.platformsh.site",
      ]; //  Allowed IP-adresses
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    app.use(cors());

    // Connecting the client to the server
    await client.connect();
    // Sending a ping to confirm a successful connection
    await client
      .db("admin")
      .command({ ping: 1 })
      .then(() => {
        console.log("Successfully connected to MongoDB!\n");
      })
      .catch((err) => {
        console.log("Error while connecting to MongoDB! ", err);
      });

    // GET DATA
    // Get categories
    app.get("/api/getCategories/:category", async (req, res) => {
      const { category } = req.params;

      try {
        await client.connect();

        const data = await client
          .db(category)
          .collection("collections")
          .find({})
          .toArray();

        if (data.length === 0) {
          res.status(404).json({ error: "Data has not found on DB." });
        } else {
          res.status(200).json(data);
        }
      } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get subcategories
    app.get(
      "/api/getSubcategories/:category/:subcategory",
      async (req, res) => {
        const { category, subcategory } = req.params;

        try {
          await client.connect();

          const data = await client
            .db(category)
            .collection(subcategory)
            .find({})
            .toArray();

          if (data.length === 0) {
            res.status(404).json({ error: "Data has not found on DB." });
          } else {
            res.status(200).json(data);
          }
        } catch (error) {
          console.error("Error handling request:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );

    // Get id of last product
    app.get(
      "/api/getLastProductId/:category/:subcategory",
      async (req, res) => {
        const { category, subcategory } = req.params;

        try {
          await client.connect();

          const data = await client
            .db(category)
            .collection(subcategory)
            .aggregate([
              { $sort: { id: -1 } }, // Сортируем документы по убыванию id
              { $limit: 1 }, // Получаем только первый документ
              { $project: { _id: 0, id: 1 } }, // Выбираем только поле id
            ])
            .toArray();

          if (data.length === 0) {
            res.status(404).json({ error: "Data has not found on DB." });
          } else {
            res.status(200).json(data[0].id);
          }
        } catch (error) {
          console.error("Error handling request:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );

    // PAYMENT
    // Create payment
    app.post("/api/buy", async (req, res) => {
      const { amount } = req.body;
      const cryptomusAPIUrl = "https://api.cryptomus.com/v1/payment";

      const data = {
        amount,
        currency: "USDT",
        order_id: crypto.randomBytes(12).toString("hex"),
        url_callback:
          "https://www.main-bvxea6i-ij5pctw5a4zt4.us-3.platformsh.site/api/payment/check",
      };

      const sign = crypto
        .createHash("md5")
        .update(
          Buffer.from(JSON.stringify(data)).toString("base64") +
            process.env.API_KEY
        )
        .digest("hex");

      const response = await axios.post(cryptomusAPIUrl, data, {
        headers: {
          merchant: process.env.MERCHANT_ID,
          sign: sign,
        },
      });

      const paymentUrl = response.data.result.url;
      res.status(200).send({ paymentUrl });
    });

    // Check payment
    app.post("/api/payment/check", async (req, res) => {
      const { sign } = req.body;

      if (!sign) {
        return res.status(400).send("Invalid payload.");
      }

      const data = JSON.parse(req.rawBody);

      delete data.sign;

      const hash = crypto
        .createHash("md5")
        .update(Buffer.from(JSON.stringify(data)).toString("base64") + API_KEY)
        .digest("hex");

      if (hash !== sign) {
        return res.status(400).send("Invalid sign");
      }

      if (data.status === "paid") {
        const emailText = "Оплата прошла успешно.";
        sendEmail("8384838z@gmail.com", "Успешная оплата", emailText);
      }

      res.sendStatus(200);
    });

    // ADMIN DASHBOARD

    // Create product
    app.post("/api/create/product/:category/:subcategory", async (req, res) => {
      const data = req.body;
      console.log("[Add product] Data: ", data);

      const { category, subcategory } = req.params;

      try {
        await client.connect();

        await client.db(category).collection(subcategory).insertOne({
          id: data.id,
          name: data.name,
          price: data.price,
          card_description: data.card_description,
          product_description: data.product_description,
          products: [],
        });
        res.status(200).json({ message: "Product added to DB succesfully!" });
        console.log("Product added to DB succesfully!");
      } catch (error) {
        console.log("Error while adding product to DB: ", error);
        res.status(500).json({ error: "Error while adding product to DB" });
      }
    });

    // Add positions
    app.post(
      "/api/add/positions/:category/:subcategory/:productId",
      async (req, res) => {
        const data = req.body;
        console.log("[Add positions] Data: ", data);

        const { category, subcategory, productId } = req.params;

        try {
          await client.connect();

          await client
            .db(category)
            .collection(subcategory)
            .updateOne(
              { id: Number(productId) },
              {
                $push: {
                  products: {
                    $each: data,
                  },
                },
              }
            );
          res
            .status(200)
            .json({ message: "Positions added to DB succesfully!" });
          console.log("Positions added to DB succesfully!");
        } catch (error) {
          console.log("Error while adding positions to DB: ", error);
          res.status(500).json({ error: "Error while adding positions to DB" });
        }
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    // Ensuring that the client will close on finish/error
    await client.close();
  }
}

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "maanukyaan@gmail.com",
      pass: "Vahe_2004",
    },
  });

  const mailOptions = {
    from: "maanukyaan@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

run().catch(console.dir);
