const nano = require('nano')('http://localhost:5984')

// nano.db.create('overview').then(function() {
//   console.log('Successfully created database. See http://127.0.0.1:5984/_utils/#/_all_dbs to see database');
// }).catch(function(err) {
//   console.error('When trying to create database, this error occured: \n', err);
// });

const overview = nano.use('overview');

//FOR POST in server/index.js
const saveGameOverview = (newGame) => {
  
  return nano.db.get('overview')
  .then((doc)=> {
    newId = (doc.doc_count+1).toString();
    newGame._id = newId
    console.log('this is id', newId)
    overview.insert(newGame)
    .then(()=>{
      console.log('You posted!');
    })
    .catch((err)=>{
      console.error(err);
    })
  })
}

//For GET in server/index.js
const retrieveGameOverview = (id) => {
  console.log('id as string', typeof id);
  //idAsNum = parseInt(id, 10);
  //console.log('id as num', idAsNum);
  q = {
    selector: {
      _id: id
    }
  }
  
  return overview.find(q)
    .then((doc) => {
      console.log('q:',q)
      console.log('doc found: ', doc);
      return doc;
    })
    .catch((err)=>{
      console.error(err)
    })
}

// For PUT in server/index.js
const updateGameOverview = (Game) =>{
  
  //updatedGame = JSON.parse(Game);
  // console.log('game', Game.docs[0]._id);
  //console.log('parsedGame', updatedGame)
  console.log('game', Game);
  const q = {
    "selector": {
      "_id": {
        "$eq": Game._id
      }
    }
  }
  return overview.find(q)
  .then(doc => {
    // var ref = doc.doc[0]._rev
    console.log('Game.game_name', Game.game_name)
    var newId = Game._id;
    var newGameName = Game.game_name
    var ref = Game._rev;
    var description = Game.description;
    var release_date = Game.release_date;
    var publisher = Game.publisher;
    var tags = Game.tags
    overview.insert({_id:newId, _rev:ref, game_name:newGameName, description: description, release_date: release_date, developer: developer, publisher: publisher, tags:tags}).then(()=> {
      console.log('doc inserted');
    })
  })
  .catch(err => console.error(err))
}





//For DELETE in server/index.js
const deleteGameOverview = (gameId) => {
  const q = {
    "selector": {
      "_id": {
        "$eq": gameId
      }
    }
  }
  return overview.find(q)
  .then((doc)=>{
    console.log('doc',doc);
    var ref = doc.docs[0]._rev
    return overview.destroy(gameId, ref)
    .then(()=>{
      console.log('doc deleted');
    })
    .catch((err)=>{
      console.error(err);
    })
  })
};

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// });

module.exports = {
  overview,
  saveGameOverview,
  retrieveGameOverview,
  updateGameOverview,
  deleteGameOverview
}


// module.exports = {};