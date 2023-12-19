require('dotenv').config()

const mongoose = require('mongoose')
const config = require('./utils/config')


if (!config.TEST_MONGODB_URI) {
  console.log('give password as argument')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(config.TEST_MONGODB_URI)

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
