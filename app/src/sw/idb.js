const { set, get } = require('idb-keyval');
module.exports = {
  updateList: async (todoList) => {
    await set('todo-list', todoList);
  },
  getList: async () => {
    const todos = await get('todo-list');
    return todos;
  },
};
