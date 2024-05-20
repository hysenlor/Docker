const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://webapp-mongo:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Die WebApp funktioniert, bravo Loren!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
