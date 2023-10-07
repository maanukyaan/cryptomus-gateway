const Router = require("express");
const router = new Router();

router.post("/");
router.get("/", (req, res) => {
  res.json({ message: "Get product..." });
});
router.get("/:id");

module.exports = router;
