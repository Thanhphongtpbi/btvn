var express = require('express');
var router = express.Router();
const Joi = require('joi');

// Defined list book
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
];

const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(5).required()
});

// Viet 1 endpoint http://localhost:3000/books/get-all (GET)
router.get('/get-all', (req, res) => {
    // tra ve danh sach toan bo cac quyen sach dang co
    res.send(books);
});

router.post('/create', (req, res) => {
    const validationResult = bookSchema.validate(req.body);
    console.log(validationResult);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    }
    books.push(book);
    res.send(book);
});

router.put('/:id', (req, res) => {
    // B1. Xac dinh ID co ton tai hay khong ?
    const findBook = books.find((b) => b.id === parseInt(req.params.id));
    if (!findBook) {
        res.status(404).send('Khong tim thay quyen sach voi ID nay');
    }

    // B2. Thuc hien validation thong tin quyen sach - title & author
    const validationResult = bookSchema.validate(req.body);
    // console.log({validationResult});
    console.log(JSON.stringify(validationResult));
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }

    // B3. Cap nhat thong tin title va author - tra ve cho user
    findBook.title = req.body.title;
    findBook.author = req.body.author;
    res.send(findBook);
});


module.exports = router;
