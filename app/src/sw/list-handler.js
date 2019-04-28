const DEBUG = __DEBUG__;

module.exports = async (request) => {
  if (DEBUG) console.log('Responding with list handler', request.url);
  return await fetch(request);
};
