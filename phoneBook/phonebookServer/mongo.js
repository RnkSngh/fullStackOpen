require('dotenv').config()
const PhoneNumber = require('./models/phoneNumber')

const mongoose = require('mongoose')

if (process.argv.length < 4) {
  PhoneNumber.find({}).then((result) => {
    result.forEach((phoneNumber) => {
      console.log(phoneNumber)
    })
    mongoose.connection.close()
  })
} else {
  const phoneNumber = new PhoneNumber({
    person: process.argv[2],
    number: process.argv[3],
  })

  phoneNumber.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
