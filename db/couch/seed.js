const nano = require('nano')('http://localhost:5984');
const faker = require('faker');

const overviewDb = nano.db.use('overview');
//with each iteration of i, push 2000 overview entries (iterated by j)
//after 5000 iterations of i, 10,000,000 entries will be made (5000*2000)
const seedOverview = function (i) {
  
  if (i < 5000) {
    // console.log(i);
    var docsArr = [];
    for (let j = 0; j < 2000; j++) {
      // console.log(j);
      docsArr.push({
        game_id: j,
        game_name: faker.random.word(),
        description: faker.lorem.paragraph(),
        release_date: faker.date.past().toISOString(),
        developer: faker.company.companyName(),
        publisher: faker.company.companyName(),
        tags: faker.random.word()
      });
    }
    overviewDb.bulk({ docs: docsArr }).then(function () {
      i++;
      seedOverview(i);
      console.log('bulk of overview db accessed at i:', i);
    }).catch(function (err) {
      console.error(err);
    })
  }
  

}
seedOverview(0);

//http://127.0.0.1:5984/_utils/#/_all_dbs

