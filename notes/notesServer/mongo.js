require("dotenv").config();

const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }


const PASSWORD = process.env.DB_PASSWORD

if (!PASSWORD) {
    console.log('give password as argument')
    process.exit(1)
}

const url =
    `mongodb+srv://ronk:${PASSWORD}@notesApp.3cvyfna.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'note 3 bleh',
//     important: false,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    });
    mongoose.connection.close()
})