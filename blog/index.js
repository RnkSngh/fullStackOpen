const { PORT } = require('./utils/config')
const { info, error } = require('./utils/logger')
const app = require('./app')

if (!PORT) {
  error('PORT IS NOT SET')
  process.exit(1)
}

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
