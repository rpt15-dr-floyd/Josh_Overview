const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const db = require('../db/index.js');
const port = 3000;

const app = express();

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
app.use(cors());
app.use('/', express.static('public'));
app.use('/:gameId', express.static('public'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get(`/api/overview/:gameId`, (req, res) => {
  console.log('got to overview get request in server');
  db.retrieve(req.params.gameId, (gameInfo) => {
    res.send(gameInfo);
  });
});

//Josh's edit
app.post('/api/overview/', (req, res) => {
  let newGame = req.body;
  console.log('new game:', newGame);
  db.save(newGame, err => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send('new game model created');
    }
  });
});

app.delete('/api/overview/:gameId', (req, res) => {
  let id = req.params.gameId;
  db.deleteGameOverview(id, err => {
    if (err) {
      console.log(err);
    } else {
      res.status(202).send(`deleted game id ${id}`);
    }
  });
});

app.put('/api/overview/:gameId', (req, res) => {
  let updateGame = req.body;
  db.updateGameOverview(updateGame, err => {
    if (err) {
      console.log(err);
    } else {
      res
        .status(202)
        .send(`updated game id ${updateGame.gameId}`);
    }
  });
});




app.listen(port, () => {
  console.log(`App listening on ${port}`);
});