const Router = require("express");
const router = new Router();

const categoryController = require("../controllers/categoryController");

router.post("/create", categoryController.create);
router.get("/getAll", categoryController.getAll);

module.exports = router;
