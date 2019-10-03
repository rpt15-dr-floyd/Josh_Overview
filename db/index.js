const mongoose = require('mongoose');
const { devDb, prodDb, nodeEnv } = require('../config.js');

console.log('devDb, prodDb, nodeEnv', devDb, prodDb, nodeEnv);


// if (nodeEnv === 'development') {
//   mongoose.connect(`mongodb://${devDb}/overview`, { useNewUrlParser: true });
// } else {
//   mongoose.connect(`mongodb://${prodDb}/overview`, { useNewUrlParser: true });
// }

mongoose.connect('mongodb://localhost/overview', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected to mongoDB');
});

const OverviewSchema = new mongoose.Schema({
  game_id: Number,
  game_name: String,
  description: String,
  release_date: String,
  developer: String,
  publisher: String,
  tags: Array
});

const Overview = mongoose.model('Overview', OverviewSchema);

const save = (gameInfo) => {
  let game = new Overview(gameInfo);
  game.save((err) => {
    if (err) {
      console.log('error while saving to db', err);
    }
  });
};

const retrieve = (gameId, sendToClient) => {
  Overview.find({ game_id: gameId })
    .exec((err, results) => {
      if (err) {
        console.log('error while retrieving data from db');
        sendToClient('The game is not in our database')
      } else {
        // console.log('results in mongo retrieve', results);
        sendToClient(results);
      }
    });
}

const count = (log) => {
  Overview.countDocuments({})
    .exec((err, results) => {
      if (err) {
        console.log('error while getting count of documents in db');
      } else {
        log(results);
      }
    })
};

// //Josh Edit:
// damn, I re-invented the wheel. stephen already wrote a save function on line 34
// const makeNewGameOverview = (game, callback) => {
//   let newGame = new AboutThisGame(game);
//   newGame.save(err => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null);
//     }
//   });
// };

const updateGameOverview = (game, callback) => {
  Overview.findOneAndUpdate(
    { game_id: game.game_id },
    {
      game_name: game.game_name,
      description: game.description,
      release_date: game.release_date,
      developer: game.developer,
      publisher: game.publisher,
      tags: game.tags
    },
    { upsert: true },
    err => {
      if (err) {
        console.log(err);
      } else {
        callback(null);
      }
    }
  );
};

const deleteGameOverview = (id, callback) => {
  console.log('this is the id in the db fn', id);
  Overview.deleteOne({ gameId: id }, err => {
    if (err) {
      console.log(err);
    } else {
      callback(null);
    }
  });
};

module.exports.save = save;
module.exports.retrieve = retrieve;
module.exports.count = count;
// module.exports.makeNewGameOverview = makeNewGameOverview;
module.exports.updateGameOverview = updateGameOverview;
module.exports.deleteGameOverview = deleteGameOverview;