const db = require('../src/config/databaseConnect');
const {server} = require('../app')

module.exports = async () => {
  if (server) {
    server.close();
  }
  db.end();
};
