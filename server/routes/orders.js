const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const orders = require("../controllers/orders");

const userSecret = process.env.USER_SECRET;

const authorizeUser = (req, res, next) => {
	const auth = req.headers["authorization"];
	const token = authorizationHeader.split(" ")[1];
	if (!token) {
		res.status(401);
	}
	jwt.verify(token, userSecret, (e) => {
		if (e) {
			next(e);
		} else {
			next();
		}
	});
};

router.post("/", authorizeUser, orders.createOrder);

module.exports = router;
