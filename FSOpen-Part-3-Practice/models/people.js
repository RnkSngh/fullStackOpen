const mongoose = require("mongoose")

const url = process.env.MONGO_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true})
    .then( (res) => console.log(`connected to ${url}`))
    .catch(error => console.log("error connecting", error))

const personSchema = new mongoose.Schema({
    name:String,
    number: String,
    dateCreated: Date
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
    
module.exports = mongoose.model("Person", personSchema)
