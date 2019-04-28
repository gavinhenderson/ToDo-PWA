const { set, get } = require('idb-keyval');

module.exports = {
  updateList: async (todoList) => {
    await set('todo-list', todoList);
  },
  getList: async () => {
    const todos = await get('todo-list');
    return todos;
  },
  addTodoOffline: async (newTodo) => {
    const offlineTodos = await get('offline-adds');

    await set('offline-adds', [...(offlineTodos ? offlineTodos : []), newTodo]);
  },
  getUnadded: async () => {
    const unadded = await get('offline-adds');
    return unadded ? unadded : [];
  },
  resetUnadded: async () => {
    await set('offline-adds', []);
  },
};
