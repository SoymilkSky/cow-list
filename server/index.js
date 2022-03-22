const express = require('express');
const path = require('path');
const db = require('../database');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.get('/api/cows', (req, res) => {
  db.get()
    .then(data => res.send(data));
})

app.post('/api/cows', (req, res) => {
  db.post(req.body)
    .then(() => res.status(201).send('Successfully added a cow to the list'))
})

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
});