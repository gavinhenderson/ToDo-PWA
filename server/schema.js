const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = {
  TodoList: mongoose.model(
    'Todo',
    Schema({
      todo: {
        type: String,
        required: true,
      },
    }),
  ),
};
