require("dotenv").config();

const express = require("express");

const PORT = process.env.SERVER_PORT || 7777;

const app = express();
app.use(bodyParser.json());

app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`\nServer succesfully started on port ${PORT}\n`);
});

mongoose.connect(process.env.MONGO_LINK, {
  useNewUrlParser: true,
});

app.get("/get", (req, res) => {
  reinstate_accounts_ari_2_line.find({}, { id: 1 }).then((data) => {
    res.send(data);
  });
});

app.get("/facebook_accounts", async (req, res) => {
  const { category, id } = req.query;

  await mongoose.connect(`${process.env.MONGO_LINK}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const facebook_accounts = mongoose.connection.useDb("facebook_accounts");
  facebook_accounts.on(
    "error",
    console.error.bind(
      console,
      "Ошибка подключения к базе данных facebook_accounts:"
    )
  );

  try {
    let result;

    switch (category) {
      case "reinstate_accounts_ari_2_line":
        result = await reinstate_accounts_ari_2_line.find({ id: Number(id) });
        break;
      case "double_reinstated_accounts_sari_3_line":
        result = await double_reinstated_accounts_sari_3_line.find({
          id: Number(id),
        });
        break;
      case "high_limit_personal_ads_accounts":
        result = await high_limit_personal_ads_accounts.find({
          id: Number(id),
        });
        break;
      default:
        res.status(400).json({ сообщение: "Недопустимое название категории!" });
        return;
    }

    res.json(result);
  } catch (error) {
    console.error(`Ошибка при обращении к коллекции ${category}:`, error);
    res.status(500).json({
      message: `Произошла ошибка при обращении к коллекции ${category}`,
      error: error.message,
    });
  }
});

// let products = [];

// db.collection("reinstate_accounts_ari_2_line")
//   .find({ id: Number(id) }) // Убираем _id и выбираем только products
//   .toArray()
//   .then((result) => {
//     if (result.length === 0) {
//       // Проверка на отсутствие данных
//       res.status(404).json({ error: "Данные не найдены" });
//     } else {
//       // Возвращаем массив объектов из поля "products"
//       res.status(200).json(result[0]);
//       let name = result[0].name;
//       products = result[0].products;
//       console.log(`Name: ${name}\nProducts count: ${products.length}`);
//       products.forEach((product) => {
//         console.log(product);
//       });
//     }
//   })
//   .catch((error) => {
//     console.error("Ошибка при запросе к базе данных:", error);
//     res.status(500).json({ error: "Внутренняя ошибка сервера" });
//   });

// // Подключение к базе данных 1
// mongoose.createConnection(`${process.env.MONGO_LINK}/facebook_accounts`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const facebook_accounts = mongoose.connection;
// console.log(facebook_accounts);

// // Подключение к базе данных 2
// mongoose.createConnection(`${process.env.MONGO_LINK}/business_manager`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const business_manager = mongoose.connection;

// // Подключение к базе данных 3
// mongoose.createConnection(`${process.env.MONGO_LINK}/fan_pages`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const fan_pages = mongoose.connection;

// Обработка ошибок подключения
// facebook_accounts.on(
//   "error",
//   console.error.bind(console, "Ошибка подключения к базе данных 1:")
// );
// business_manager.on(
//   "error",
//   console.error.bind(console, "Ошибка подключения к базе данных 2:")
// );
// fan_pages.on(
//   "error",
//   console.error.bind(console, "Ошибка подключения к базе данных 3:")
// );
