//postgres config
const psqlconfig = require('./login.config.js').psql;
const Client = require('pg');

const client = new Client({
    database: 'overview'
  });


const saveToPostgres = (gameInfo, cb) => {
    client.query('INSERT INTO gameInfoTbl (game_id, game_name, description, release_date, developer, publisher, tags) values (gameInfo.game_id, gameInfo.game_name, gameInfo.description, gameInfo.release_date, gameInfo.developer, gameInfo.publisher, gameInfo.tags)')
    .then(response => {
        cb(response)
    })
    .catch(error => {
        cb(error)
    })
}

module.exports.saveToPostgres = saveToPostgres;