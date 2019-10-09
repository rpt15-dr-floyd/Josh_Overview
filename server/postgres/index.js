//postgres config

const Client = require('pg');

const client = new Client({
    database: 'overview'
  });


const saveToPostgres = (gameInfo, cb) => {
    client.query(`INSERT INTO gameInfoTbl (game_id, game_name, game_description, release_date, developer, publisher, tags) values (${gameInfo.game_id}, ${gameInfo.game_name}, ${gameInfo.game_description}, ${gameInfo.release_date}, ${gameInfo.developer}, ${gameInfo.publisher}, ${gameInfo.tags})`)
    .then(response => {
        cb(response)
    })
    .catch(error => {
        cb(error)
    })
}

module.exports.saveToPostgres = saveToPostgres;