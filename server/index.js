const express = require('express');
const path = require('path');
const db = require('../database');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/cows', (req, res) => {
  db.get()
    .then(data => res.send(data));
})

app.post('/api/cows', (req, res) => {
  db.post(req.body)
    .then(() => res.status(201).send('Successfully added a cow to the list'));
})

app.patch('/api/cows', (req, res) => {
  db.patch(req.body)
    .then(() => res.status(200).send('Cow data updated'));
})

app.delete('/api/cows', (req, res) => {
  db.delete(req.body)
    .then(() => res.status(200).send('Cow deleted'));
})

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
});