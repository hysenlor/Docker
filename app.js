const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://webapp-mongo:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemSchema);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Die WebApp funktioniert, bravo Loren!');
});

app.post('/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.status(201).send(newItem);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.send(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
