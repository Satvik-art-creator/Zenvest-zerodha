const router = require("express").Router();
const {requireAuth} = require("../middlewares/AuthMiddleware");

const {getHoldings, getPositions, getOrders} = require("../controllers/getStockData.js");
const {getFunds} = require("../controllers/fundController.js");

router.get("/allHoldings", requireAuth, getHoldings);
router.get("/allPositions", requireAuth, getPositions);
router.get("/allOrders", requireAuth, getOrders);

router.get("/funds", requireAuth, getFunds);

module.exports = router;

