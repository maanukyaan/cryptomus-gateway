const Router = require("express");
const router = new Router();

const categoryRouter = require("./categoryRouter");
const subcategoryRouter = require("./subcategoryRouter");
const subsubcategoryRouter = require("./subsubcategoryRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

router.use("/category", categoryRouter);
router.use("/subcategory", subcategoryRouter);
router.use("/subsubcategory", subsubcategoryRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);

module.exports = router;
