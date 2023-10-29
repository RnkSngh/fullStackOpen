require('dotenv').config()

const mongoose = require('mongoose')
const config = require('./utils/config')

const PASSWORD = config.DB_PASSWORD

if (!PASSWORD) {
  console.log('give password as argument')
  process.exit(1)
}

const url = `mongodb+srv://ronk:${PASSWORD}@notesApp.3cvyfna.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
