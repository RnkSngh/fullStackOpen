const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI

if (!DB_URI) {
  console.log('Make sure URI is saved in .env')
  process.exit(1)
}

mongoose.set('strictQuery', false)
console.log('Connecting to database ...')
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('connected to database')
  })
  .catch((er) => {
    console.log('error connecting to db', er.message)
  })

const phoneNumberSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    reqiured: true,
    validate: {
      validator: new RegExp('[0-9]{2,3}[-][0-9]+'),
    },
  },
})

phoneNumberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  },
})
module.exports = mongoose.model('PhoneNumber', phoneNumberSchema)
