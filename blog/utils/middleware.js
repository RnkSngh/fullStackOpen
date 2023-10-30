const morgan = require('morgan')
const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name == 'CastError') {
    return response.status(400).send({ error: error.message })
  }

  if (error.name == 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

module.exports = { morgan, errorHandler, unknownEndpoint }
