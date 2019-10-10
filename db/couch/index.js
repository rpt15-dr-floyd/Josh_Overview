const nano = require('nano')('http://localhost:5984')

nano.db.create('overview').then(function() {
  console.log('Successfully created database. See http://127.0.0.1:5984/_utils/#/_all_dbs to see database');
}).catch(function(err) {
  console.error('When trying to create database, this error occured: \n', err);
});

const overview = nano.use('overview');

// module.exports.db = overview;
module.exports = {overview};