const router=require("express").Router();
const {createOrder} = require("../controllers/handleStockData.js");
const {postFund} = require("../controllers/fundController.js");
const {validateOrder} = require("../middlewares/validateOrder.js");
const {validateFund} = require("../middlewares/validateFund.js");
const {requireAuth} = require("../middlewares/AuthMiddleware.js");

router.post("/newOrder", requireAuth, validateOrder, createOrder);

router.post("/funds", requireAuth, validateFund, postFund);

module.exports = router;