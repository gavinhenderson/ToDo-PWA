const { getUnadded, resetUnadded } = require('./idb');
const { BASE_URL } = require('../utils');

module.exports = {
  offlineHandler: () => {},
  onlineHandler: async () => {
    const unAdded = await getUnadded();

    await Promise.all(
      unAdded.map(async (unadded) => {
        return await fetch(BASE_URL + '/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newTodo: unadded }),
        }).catch(console.log);
      }),
    );

    await resetUnadded();
  },
};
