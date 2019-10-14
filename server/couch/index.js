const express = require('express');
const db = require('../../db/couch/index.js');
const port = 3002;
const app = express();
require('newrelic')

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
  db.retrieveGameOverview(req.query.gameId)
  .then((gameinfo)=>{
    res.send(gameinfo);
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
  .catch((err)=>{
    console.error(err);
  })
});

app.delete('/api/overview/:gameId?', (req, res) => {
  let id = (req.query.gameId).toString();
  console.log(typeof(id));
  db.deleteGameOverview(id)
  .then(()=>{
    res.status(202).send(`deleted game id ${id}`)
  })
  .catch((err)=>{
    console.error(err);
  })
});

app.put('/api/overview/', (req, res) => {
  let Game = req.body;
  //console.log('new game:', Game);
  db.updateGameOverview(Game)
  .then(()=>{
    res.status(201).send(' game model updated');
  })
  .catch(err => console.error(err))
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});