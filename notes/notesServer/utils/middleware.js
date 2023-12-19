const morgan = require('morgan')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }
  next(error)
}

morgan.token('body', (req) => JSON.stringify(req.body))

module.exports = { unknownEndpoint, errorHandler, morgan }
