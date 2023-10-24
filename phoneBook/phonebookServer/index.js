const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':body :method :url :status :res[content-length] - :response-time ms'))


let phoneBook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const getNewId = () => {
    const newEntry = Math.floor(Math.random() * 1e6);
    return newEntry
}

app.get("/api/persons/", (request, response) => {
    response.json(phoneBook)
});

app.get("/api/persons/:id/", (req, res) => {
    const id = Number(req.params.id)
    phone = phoneBook.filter((phoneBookEntry) => {
        return id === phoneBookEntry.id
    })
    if (phone.length > 0) {
        res.json(phone)
    }
    else {
        res.status(404).end();
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    phoneBook = phoneBook.filter(entry => entry.id != id)
    res.status(204).end();

})

app.post("/api/persons/", (req, res) => {
    body = req.body;
    if (!body.name) {
        res.status(400).json({ error: `Missing name` })
    }
    if (!body.number) {
        res.status(400).json({ error: "Missing number" })
    }
    if (phoneBook.filter(item => item.name === body.name).length > 0) {
        res.status(400).json({ error: "Name already exists" })
        return
    }

    const newPhoneBookEntry = {
        id: getNewId(),
        name: req.body.name,
        number: req.body.number
    }

    phoneBook.push(newPhoneBookEntry)
    res.json(newPhoneBookEntry)

})

app.get("/info/", (req, res) => {
    res.send(`Phonebook has info for ${phoneBook.length} people <br/> ${(new Date()).toUTCString()}`);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint" })
}



const PORT = process.env.PORT || 3001;

app.use(unknownEndpoint);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

