const DEBUG = __DEBUG__;
const { updateList, getList, addTodoOffline, getUnadded } = require('./idb');

const handleList = async (request) => {
  try {
    const result = await fetch(request);
    const clonedResult = result.clone();

    const todosObject = await clonedResult.json();

    const rawTodos = todosObject.todos.map((todo) => todo.todo);

    await updateList(rawTodos);

    return result;
  } catch (e) {
    const list = await getList();
    const unAdded = await getUnadded();

    const fullList = [...list, ...unAdded];

    const mapped = fullList.map((current) => ({
      todo: current,
    }));

    const blob = new Blob([JSON.stringify({ todos: mapped })], {
      type: 'application/json',
    });
    const response = new Response(blob);

    return response;
  }
};

const handleAdd = async (request) => {
  const cloned = request.clone();
  try {
    const response = await fetch(request);
    return response;
  } catch (e) {
    const result = await cloned.json();
    console.log('request', result);

    const newTodo = await result.newTodo;
    await addTodoOffline(newTodo);

    const blob = new Blob([JSON.stringify({ newTodo })], {
      type: 'application/json',
    });
    const response = new Response(blob);

    return response;
  }
};

module.exports = async (request) => {
  if (DEBUG) console.log('Responding with list handler', request.url);

  const stringURL = request.url.toString();
  if (stringURL.includes('list')) return await handleList(request);
  if (stringURL.includes('add')) return await handleAdd(request);
};
