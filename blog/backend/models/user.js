const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { required: true, type: String, unique: true, minLength: 3 },
  name: { required: true, type: String },
  passwordHash: { required: true, type: String },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const UserSchema = mongoose.model('User', userSchema)
module.exports = UserSchema
