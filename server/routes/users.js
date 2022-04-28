const express = require("express");
const router = express.Router();
const user = require("../controllers/users");

router.post("/signup", user.createUser);

router.post("/signin", user.validateUser);

module.exports = router;
