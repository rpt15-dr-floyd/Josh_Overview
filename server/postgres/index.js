const express = require('express');
const db = require('../../db/postgres/index.js');
const port = 3000;
const app = express();

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

app.use('/', express.static('public'));
app.use('/:gameId', express.static('public'));

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get(`/api/overview/:gameId`, (req, res) => {
  console.log('got to overview get request in server');
  console.log(req.url);
  console.log('req params gameID', req.params.gameId);
  db.retrieveGameOverview(req.params.gameId)
  .then((gameinfo)=>{
    // console.log('gameInfo!', gameinfo);
    var arrayOfGameInfo = [];
    arrayOfGameInfo.push(gameinfo);
    // res.send(gameinfo);
    res.send(arrayOfGameInfo);
  })
  .catch((err)=>{
    console.error(err);
  })
});


app.post('/api/overview/', (req, res) => {
  let newGame = req.body;
  console.log('new game:', newGame);
  db.saveGameOverview(newGame)
  .then(()=>{
    res.status(201).send('new game model created');
  })
  
      //res.status(201).send('new game model created');
    
});

app.delete('/api/overview/', (req, res) => {
  let id = req.query.gameId;
  db.deleteGameOverview(id)
  .then(()=>{
    res.status(202).send(`deleted game id ${id}`)
  })
  .catch((err)=>{
    console.error(err);
  })
});

app.put('/api/overview/', (req, res) => {
  let newGame = req.body;
  console.log('new game:', newGame);
  db.updateGameOverview(newGame)
  .then(()=>{
    res.status(201).send(' game model updated');
  })
  
      //res.status(201).send('new game model created');
    
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});