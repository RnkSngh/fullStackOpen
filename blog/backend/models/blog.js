const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, minLength: 3, required: true },
  author: { type: String },
  url: { type: String },
  likes: { type: Number, default: 0 },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
  ],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
