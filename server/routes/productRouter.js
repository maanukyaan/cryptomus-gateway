const Router = require("express");
const router = new Router();

const productController = require("../controllers/productController");

router.post("/crate", productController.crate);
router.get("/getAll", productController.getAll);
router.get("/getOne", productController.getOne);

module.exports = router;
