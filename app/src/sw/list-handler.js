const DEBUG = __DEBUG__;
const { updateList, getList } = require('./idb');

const handleList = async (request) => {
  try {
    const result = await fetch(request);
    const clonedResult = result.clone();

    const todosObject = await clonedResult.json();

    const rawTodos = todosObject.todos.map((todo) => todo.todo);

    await updateList(rawTodos);

    console.log('RAW TODOS', rawTodos);
    console.log('cloned - Result', clonedResult);

    return result;
  } catch (e) {
    console.log(e);

    const list = await getList();

    console.log('LIST', list);

    const mapped = list.map((current) => ({
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
  return await fetch(request);
};

module.exports = async (request) => {
  if (DEBUG) console.log('Responding with list handler', request.url);

  const stringURL = request.url.toString();
  if (stringURL.includes('list')) return await handleList(request);
  if (stringURL.includes('add')) return await handleAdd(request);
};
