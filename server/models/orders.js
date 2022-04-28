const mongoose = require("mongoose");

const Book = mongoose.Schema({
	bookID: String,
	title: String,
	price: Number,
	orderQuantity: Number,
});

const OrderSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.ObjectId,
			ref: "user",
		},
		orderBooks: Book,
		totalMoney: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("orders", OrdersSchema);
