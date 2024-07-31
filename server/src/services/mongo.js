const mongoose = require('mongoose')
const { MONGO_URL } = require('../../config')

mongoose.connection.once('open', () => {
  console.log('Mongo DB connection ready')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function mongooseConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongooseCloseConnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongooseConnect,
  mongooseCloseConnect
}