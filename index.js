const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});
morgan.token("phoneBook", () => {
    return JSON.stringify(PhoneBook);
});
app.use(morgan(":method :url :status :response-time ms :body "));
let PhoneBook = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.use(express.json());
app.use(express.static("./dist"));
app.get("/api/persons", (req, res) => {
    if (req.query.name) {
        console.log(req.query.name);
        for (let i of PhoneBook) {
            if (i.name === req.query.name) {
                res.json(i);
                return;
            }
        }
        res.json([]);
        return;
    } else res.json(PhoneBook);
});

app.get("/info", (req, res) => {
    res.send(`<p>PhoneBook has ${PhoneBook.length}</p><p>${Date()}</p>`);
});

app.get("/api/id", (req, res) => {
    console.log("mcoe");
    res.json({ id: PhoneBook[PhoneBook.length - 1].id });
});

app.get("/api/persons/:id", (req, res) => {
    id = req.params.id;
    let note = PhoneBook.filter((p) => p.id == id);
    if (note.length) {
        res.json(note);
    } else {
        res.status(404).send("No person found");
    }
});
app.delete("/api/persons/:id", (req, res) => {
    id = req.params.id;
    PhoneBook = PhoneBook.filter((n) => n.id != id);
    res.json({ id: id });
});
app.get("/api/persons/", (req, res) => {
    name = req.query.name;
    console.log();
});
app.post("/api/persons/", async (req, res) => {
    console.log("meow");
    let person = await req.body;
    let exists = PhoneBook.some((p) => {
        return p.name == person.name;
    });
    if (exists) {
        res.status(409).json({ error: "name must be unique" });
        return;
    }
    exists = PhoneBook.some((p) => {
        return p.number == person.number;
    });
    if (exists) {
        res.status(409).json({ error: "number must be unique" });
        return;
    }
    person.id = Math.random() * 1000;
    PhoneBook.push(person);
    res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is running in ", PORT);
});
