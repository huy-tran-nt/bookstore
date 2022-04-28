const express = require("express");
const jwt = requrie("jsonwebtoken");
const orders = require("../controllers/orders");
const admin = require("../controllers/admin");

const router = express.Router();

const secret = process.env.SECRET;

const authorizeAdmin = (req, res, next) => {
	const auth = req.headers["authorization"];
	const token = auth.split(" ")[1];

	if (!token) {
		res.status(400);
	}

	jwt.verify(token, secret, (err) => {
		if (er) {
			next(er);
		} else {
			next();
		}
	});
};

router.get("/orders", authorizeAdmin, orders.showAllOrders);

router.post("/signup", admin.createAdmin);

router.post("/signin", admin.validateAdmin);

module.exports = router;
