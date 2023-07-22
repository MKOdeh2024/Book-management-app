"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Sample_data_1 = require("./data/Sample_data");
var app = (0, express_1.default)();
var port = 3000;
// app.use(express.text()); // Just to read the body of requests
app.use(express_1.default.json()); // Just to read the body of requests
// Retreive all
app.get("/books/all", function (req, res) {
    res.json(Sample_data_1.default);
});
// Retreive a specific boo
app.get("/books/:id", function (req, res) {
    for (var i = 0; i < Sample_data_1.default.length; i++) {
        if (Sample_data_1.default[i].id === parseInt(req.params.id)) {
            res.json(Sample_data_1.default[i]); // spread operator
            return;
        }
    }
    res.send("No book found");
});
// Add a book
app.post("/books", function (req, res) {
    var newStudent = req.body;
    if (typeof newStudent === "object") {
        Sample_data_1.default.unshift(newStudent);
        res.send("Thanks, New book added!");
    }
    else {
        res.send("Wrong Formant of Data");
    }
});
//Update a book
app.put("/books/:id", function (req, res) {
    console.log(req.params.id);
    for (var i = 0; i < Sample_data_1.default.length; i++) {
        if (Sample_data_1.default[i].id === parseInt(req.params.id)) {
            Sample_data_1.default[i] = __assign(__assign({}, Sample_data_1.default[i]), req.body); // spread operator
            res.send("Update succeeded");
            return;
        }
    }
    res.send("Update failed");
});
//Delete a book:
app.delete("/books", function (req, res) {
    var _a;
    console.log(req.query.id);
    if (!req.query.id) {
        res.send("no id in query params");
        return;
    }
    else {
        var stID = parseInt((_a = req.query.id) === null || _a === void 0 ? void 0 : _a.toString());
        for (var i = 0; i < Sample_data_1.default.length; i++) {
            if (Sample_data_1.default[i].id === stID) {
                delete Sample_data_1.default[i];
                res.send("Book was deleted");
                return;
            }
        }
        res.send("Error : No Book Found");
    }
});
// Query books by name
app.get("/books/:name", function (req, res) {
    var _a;
    var bookName = (_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString();
    for (var i = 0; i < Sample_data_1.default.length; i++) {
        if (Sample_data_1.default[i].title === bookName) {
            res.json(Sample_data_1.default[i]);
            return;
        }
    }
    res.send("No book found");
});
// Query books by publishing year
app.get("/books/:publicationYear", function (req, res) {
    var _a;
    var bookYear = (_a = req.query.publicationYear) === null || _a === void 0 ? void 0 : _a.toString();
    for (var i = 0; i < Sample_data_1.default.length; i++) {
        if (Sample_data_1.default[i].title === bookYear) {
            res.json(Sample_data_1.default[i]);
            return;
        }
    }
    res.send("No book found");
});
app.listen(port, function () {
    console.log("The app is listening on port ".concat(port));
});
/// npm i @types/express -D
