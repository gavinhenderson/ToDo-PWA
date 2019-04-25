const PORT = process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo');
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

require('./schema');

const Todo = mongoose.model('Todo');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!!'));

app.post('/add', (req, res) => {
  const { newTodo } = req.body;

  const dbTodoModel = new Todo({ todo: newTodo });

  dbTodoModel.save((err) => {
    if (err) return res.send(500, { err });

    return res.send(200, { todo: newTodo });
  });
});

app.get('/list', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) return res.send(500, { err });

    return res.send(200, { todos });
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
