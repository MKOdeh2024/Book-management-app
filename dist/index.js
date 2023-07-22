import express from "express";
import data from "./data/Sample_data.js";
const app = express();
const port = 3000;
// app.use(express.text()); // Just to read the body of requests
app.use(express.json()); // Just to read the body of requests
// Retrieve all
app.get("/books/", (req, res) => {
    res.json(data);
});
// Retrieve a specific boo
app.get("/books/:id", (req, res) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {
            res.json(data[i]); // spread operator
            return;
        }
    }
    res.send("No book found");
});
// Add a book
app.post("/books", (req, res) => {
    let newBook = {
        id: data[data.length - 1].id + 1,
        title: " ",
        author: " ",
        publicationYear: 0,
    };
    data.push({ ...newBook, ...req.body });
    res.send("Book was added");
});
//Update a book
app.put("/books/:id", (req, res) => {
    console.log(req.params.id);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {
            data[i] = { ...data[i], ...req.body }; // spread operator
            res.send("Update succeeded");
            return;
        }
    }
    res.send("Update failed");
});
//Delete a book:
app.delete("/books/:id", (req, res) => {
    console.log(req.params.id);
    if (!req.params.id) {
        res.send("no id in query params");
        return;
    }
    else {
        const stID = parseInt(req.params.id);
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === stID) {
                delete data[i];
                res.send("Book was deleted");
                return;
            }
        }
    }
    res.send("Error : No Book Found");
});
// Query books by name
app.get("/books/:name", (req, res) => {
    var _a;
    const bookName = (_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString();
    if (!bookName) {
        return res.status(400).json({ error: "Book name is required" });
    }
    const matchedBooks = data.filter((book) => {
        book.title = bookName;
    });
    if (matchedBooks.length === 0) {
        return res
            .status(404)
            .json({ error: "No books found with the provided name" });
    }
    res.json(matchedBooks);
});
// Query books by publishing year
app.get("/books/:publicationYear", (req, res) => {
    var _a;
    const bookYear = Number((_a = req.query.publicationYear) === null || _a === void 0 ? void 0 : _a.toString());
    const book = data.filter((book) => book.publicationYear === bookYear);
    if (book === null || book === undefined) {
        res.status(404).send("No book found");
    }
    else
        res.json(book);
});
app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
});
/// npm i @types/express -D
