const mongoose = require("mongoose")

const printAllPersons = (Person)=>{
    Person
    .find({})
    .then( result => {
        result.forEach( person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
    .catch( error => {
        console.log(error);
    })
};

const addPerson = (person)=>{
    person
    .save()
    .then( result=> {
        console.log(result);
        mongoose.connection.close()
    })
};


if (process.argv.length < 3){
    console.log("please provide password");
    process.exit(1)
}else{
    const password = process.argv[2]
    const url = `mongodb+srv://fullstacklearnin:${password}@cluster0.dqxx0.mongodb.net/phoneApp?retryWrites=true&w=majority`
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true})
    const personSchema = new mongoose.Schema({
        name:String,
        number: String
    })
    
    const Person = mongoose.model("Person", personSchema)

    if (process.argv.length=== 3){
    printAllPersons(Person)
    }
    else{
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    addPerson(newPerson)

    }
}


