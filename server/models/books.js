const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image_src: {
		type: String,
		required: true,
	},
	detail: {
		type: String,
		required: false,
	},
	isbn: {
		type: String,
		required: true,
	},
	publisher: {
		type: String,
		required: true,
	},
	pdate: {
		type: String,
		required: true,
	},
	pages: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("book", bookSchema);
