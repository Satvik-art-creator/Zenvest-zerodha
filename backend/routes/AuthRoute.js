const {
	Signup,
	Login,
	Logout,
	VerifyEmail,
	ResendVerificationEmail,
} = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();
const {validateUser} = require("../middlewares/validateUser.js");

router.post("/signup", validateUser, Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/logout", Logout);
router.get("/verify-email", VerifyEmail);
router.post("/resend-verification", ResendVerificationEmail);

module.exports = router;