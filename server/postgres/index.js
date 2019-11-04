const express = require('express');
const db = require('../../db/postgres/index.js');
const port = 3000;
const app = express();

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const {sequelize} = require('../../db/postgres/index.js');
app.use('/', express.static('public'));
// app.use('/', express.static(__dirname + '/../../')); //loader.io
app.use('/:gameId', express.static('public'));

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//authenticate connection to database
sequelize.authenticate().then(() => {
  console.log('authenticated');
  console.log(__dirname + '/../../');
}).catch((err) => {
  console.log('line 11 consolelog', err);
})

//pasted from Justin
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


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