const Router = require("express");
const router = new Router();

const subsubcategoryController = require("../controllers/subsubcategoryController");

router.post("/create", subsubcategoryController.create);
router.get("/getAll", subsubcategoryController.getAll);

module.exports = router;
