const router = require("express").Router();
const { regisTration, login } = require("../controller/userController");

// Register
router.post("/register", regisTration);

// Login
router.post("/login", login);

module.exports = router;
