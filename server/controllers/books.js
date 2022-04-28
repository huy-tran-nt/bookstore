const book = require("../models/books");

exports.getBooks = function (req, res, next) {
	book.find({}, function (err, results) {
		if (err) {
			return next(err);
		}
		res.json(results);
	});
};

exports.getByID = function (req, res, next) {
	book.findById(req.params.id, function (e, result) {
		if (e) {
			return next(e);
		}
		res.json(result);
	});
};

exports.getByTitle = function (req, res, next) {
	const pattern = `.*${req.params.search_title}.*`;
	book.find({
		title: new RegExp(pattern, "i"),
	}).exec(function (e, results) {
		if (e) {
			return next(e);
		}
		res.json(results);
	});
};

exports.createBook = function (req, res, next) {
	const b = new book({
		title: req.body.title,
		author: req.body.author,
		price: parseFloat(req.body.price),
		image_src: req.body.image_src,
		isbn: req.body.isbn_13,
		publisher: req.body.publisher,
		publish_date: req.body.publish_date,
		pages: parseInt(req.body.pages),
	});
	book.create(new_book, function (e) {
		if (e) {
			return next(e);
		}
	});
};

exports.deleteBook = function (req, res, next) {
	book.findByIdAndRemove(req.params.id, function (e) {
		if (e) {
			return next(e);
		}
	});
};
