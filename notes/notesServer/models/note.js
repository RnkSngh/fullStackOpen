
const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI

if (!DB_URI) {
    console.log('Set DB_URI variable in env file')
    process.exit(1)
}

console.log("connecting to: ", DB_URI);

mongoose.set('strictQuery', false)
mongoose.connect(DB_URI).then(result => { console.log("connected to DB") }).catch(err => { console.log("error connecting to database", err.message) })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Note", noteSchema);