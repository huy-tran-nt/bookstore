const orders = require("../models/orders");

exports.showAllOrders = function (req, res, next) {
	orders
		.find({})
		.populate("userID")
		.exec((e, orders) => {
			if (e) {
				next(e);
			}
			res.json(orders);
		});
};

exports.createOrder = function (req, res) {
	const id = req.body.id;
	const books = req.body.orderBooks;
	const total = req.body.totalMoney;

	const newOrder = new orders({
		id,
		books,
		total,
	});

	orders.create(newOrder, (e, order) => {
		if (e) {
			next(err);
		}
		res.json({ orderStatus: "success" });
	});
};
