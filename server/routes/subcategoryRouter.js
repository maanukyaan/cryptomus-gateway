const Router = require("express");
const router = new Router();

const subcategoryController = require("../controllers/subcategoryController");

router.post("/crate", subcategoryController.crate);
router.get("/getAll", subcategoryController.getAll);

module.exports = router;
