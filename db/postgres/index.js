const Sequelize = require('sequelize');

const sequelize = new Sequelize('overview', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});
sequelize.authenticate().then(() => {
 console.log('authenticated');
}).catch((err) => {
 console.error(err);
})

const OverviewModel = sequelize.define('OverviewModel', {
  game_id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  game_name: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  release_date: {type: Sequelize.STRING},
  developer: {type: Sequelize.STRING},
  publisher: {type: Sequelize.STRING},
  tags: {type: Sequelize.STRING},
  
});

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// });

module.exports = {
  OverviewModel
}
