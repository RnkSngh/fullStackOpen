const { response, request } = require("express");
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express();
var morgan = require('morgan')
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(express.static("build"))
app.use(express.static("infofiles"))
People = require("./models/people")


let people = [
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

app.get("/", (request, response) => {
    response.json("hellow");
})


app.get("/api/persons", (request, response) => {
    People.find({})
        .then( people => 
            response.json(people)
        )
})

app.get("/api/persons/:id", (request, response) => {

    People.findByID(response.params.id)
        .then( person => {
            if(!person){
                response.status(400).json({
                    error: 'id not found'
                })
            }
            response.json(people)
        })
})

app.get("/info", (request, response) => {
    const date = new Date()
    const infoString = `<p> Phonebook has info for ${people.length} people </p> <p> ${date} </p>`
    response.send(infoString);
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    people = people.filter((person) => person.id!== id)
    console.log(people);
    response.status(204).end()
})

const generateID = ()=>{
    return (
        Math.floor(Math.random()*100000)
)};

app.post("/api/persons", (request, response) => {
    const errors = []
    const body = request.body
    console.log("request");
    if (!body.name){
        errors.push({"error":"name missing"})
    }
    if (!body.number){
        errors.push({"error":"number missing"})
    }

    const existingPerson = people.find((person) => person.name === body.name);
    if (existingPerson){
        errors.push({"error":"person already in phonebook"})
    }
    if (errors.length>0) {
        console.log("errored", errors);
        return response.status(400).json({
            error:errors
        })
    }
    const newPerson = new People({
        name:body.name,
        number:body.number,
        dateCreated: new Date()
    })
    console.log(newPerson);


    newPerson.save()
        .then( person => {
            response.json(person)
        })
        .catch(error=> {
            console.log("error saving", error);
        })
    
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`app listening on port: ${PORT}`);