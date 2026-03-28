const router = require("express").Router();
const { requireAuth } = require("../middlewares/AuthMiddleware.js");
const UserController = require("../controllers/UserController.js");

router.get("/user", requireAuth, UserController);

module.exports=router;