const express = require('express');
const cors =  require('cors');
const path = require('path');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;