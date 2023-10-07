const Router = require("express");
const router = new Router();

const categoryRouter = require("./categoryRouter");
const subcategoryRouter = require("./subcategoryRouter");
const subsubcategoryRouter = require("./subsubcategoryRouter");
const productRouter = require("./productRouter");

router.use("/category", categoryRouter);
router.use("/subcategory", subcategoryRouter);
router.use("/subsubcategory", subsubcategoryRouter);
router.use("/product", productRouter);

module.exports = router;
