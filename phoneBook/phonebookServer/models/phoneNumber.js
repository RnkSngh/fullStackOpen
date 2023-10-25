const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI

if (!DB_URI) {
    console.log('Make sure URI is saved in .env')
    process.exit(1)
}

mongoose.set('strictQuery', false)
console.log("Connecting to database ...");
mongoose.connect(DB_URI).then(result => { console.log("connected to database") }).catch(er => { console.log("error connecting to db", er.message) })

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String,
})

phoneNumberSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})
module.exports = mongoose.model('PhoneNumber', phoneNumberSchema)






