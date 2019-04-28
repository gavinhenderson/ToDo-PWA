module.exports = {
  createDB: () => {
    idb.open('products', 1, function(upgradeDB) {
      var store = upgradeDB.createObjectStore('beverages', {
        keyPath: 'id',
      });
      store.put({ id: 123, name: 'coke', price: 10.99, quantity: 200 });
      store.put({ id: 321, name: 'pepsi', price: 8.99, quantity: 100 });
      store.put({ id: 222, name: 'water', price: 11.99, quantity: 300 });
    });
  },
};
