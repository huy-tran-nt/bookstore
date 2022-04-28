const express = require("express");
const router = express.Router();
const book = require("../controllers/books");

router.get("/", book.getBooks); // get all

router.get("/book_details/:id", book.getByID); // get by ID

router.get("/book_title/:search_title", book.getByTitle);

module.exports = router;
