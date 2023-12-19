const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, minLength: 3 },
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog', required: true },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
