
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();

const PhoneNumber = require("./models/phoneNumber")


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':body :method :url :status :res[content-length] - :response-time ms'))


app.get("/api/persons/", (request, response) => {
    PhoneNumber.find({}).then(result => { response.json(result) })
});

app.get("/api/persons/:id/", (req, res, next) => {
    const id = req.params.id
    PhoneNumber.findById(id).then(note => {
        if (note) {
            res.json(note)
        }
        else {
            res.status(404).end()
        }
    }).catch(err => {
        next(err)
    })

})

app.put(`/api/persons/:id/`, (request, response, next) => {
    const body = request.body
    const phoneNumber = {
        name: body.name, number: body.number
    }

    PhoneNumber.findByIdAndUpdate(request.params.id, phoneNumber, { new: true })
        .then(newPhoneNumber => { response.json(newPhoneNumber) })
        .catch(err => { next(err) })

})

app.delete("/api/persons/:id", (request, response, next) => {
    PhoneNumber.findByIdAndDelete(request.params.id)
        .then(result => { response.status(204).end() })
        .catch(err => { next(err) })

})

app.post("/api/persons/", (req, res, next) => {
    body = req.body;
    if (!body.name) {
        res.status(400).json({ error: `Missing name` })
    }
    if (!body.number) {
        res.status(400).json({ error: "Missing number" })
    }
    const newPhoneNumber = new PhoneNumber({
        name: req.body.name,
        number: req.body.number
    })

    newPhoneNumber.save()
        .then(result => { res.json(result) })
        .catch(err => { next(err) })
})

app.get("/info/", (req, res, next) => {
    PhoneNumber.count().then(count => {
        res.send(`<br> Phonebook has info for ${count} people <br/> ${(new Date()).toUTCString()}`);
    }).catch(err => { next(err) })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    if (error.name == "CastError") {
        response.status(400).send({ error: "malformatted ID" })
    }
    next(error)
}

const PORT = process.env.PORT || 3001;

app.use(unknownEndpoint);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

