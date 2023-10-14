require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.SERVER_PORT || 7777;

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
        "https://154.7.253.78",
        "https://valgoshop.com",
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

    app.get("/api/:category/:collection/:id", async (req, res) => {
      const { category, collection, id } = req.params;

      try {
        await client.connect();

        // Ваш код для выполнения запроса к MongoDB
        const data = await client
          .db(category)
          .collection(collection)
          .find({ id: Number(id) })
          .toArray();

        if (data.length === 0) {
          res.status(404).json({ error: "Данные не найдены" });
        } else {
          res.status(200).json(data[0]);
          let name = data[0].name;
          products = data[0].products;
          console.log(`Name: ${name}\nProducts count: ${products.length}`);
          products.forEach((product) => {
            console.log(product);
          });
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

      try {
        await client.connect();

        // Ваш код для выполнения запроса к MongoDB
        data = await client
          .db(postData.category_name)
          .collection(postData.subcategory_name)
          .findOne({ name: postData.product_name });

        if (!data) {
          res.status(404).json({ error: "Данные не найдены" });
        } else {
          // Отправка ответа обратно клиенту
          res.status(200).json({
            data: data.products,
          });
        }
      } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
