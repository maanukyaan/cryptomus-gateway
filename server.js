require("dotenv").config();
const config = require("platformsh-config").config();

const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const nodemailer = require("nodemailer");

const PORT = config.port;

const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongo_url = process.env.MONGO_LINK;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
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

    // PAYMENT
    // Create payment
    app.post("/api/buy", async (req, res) => {
      const { amount, currency } = req.body;
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

    // FOR ADMIN DASHBOARD
    // Add product
    app.post(
      "/api/add/product/:category/:subcategory/:productId",
      async (req, res) => {
        const loginAndPassword = req.body;
        console.log("Claimed login and password: ", loginAndPassword);

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
                  products: loginAndPassword,
                },
              }
            );
          res.status(200).json({ message: "Data added to DB succesfully!" });
          console.log("Data added to DB succesfully!");
        } catch (error) {
          console.log("Error while adding data to DB: ", error);
          res.status(500).json({ error: "Error while adding data to DB" });
        }
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
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
