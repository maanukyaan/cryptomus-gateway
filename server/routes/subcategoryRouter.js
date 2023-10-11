const Router = require("express");
const router = new Router();

const subcategoryController = require("../controllers/subcategoryController");

router.post("/create", subcategoryController.create);
router.get("/getAll", subcategoryController.getAll);

module.exports = router;
