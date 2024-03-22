const express = require('express')

const app = express()
const PORT = 4000

app.get('/', function (req, res) {
  res.send('Hey YOU, Go Away!!!')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})