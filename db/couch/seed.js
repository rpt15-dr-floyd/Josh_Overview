const nano = require('nano')('http://localhost:5984');
const faker = require('faker');

const overviewDb = nano.db.use('overview');
//with each iteration of i, push 2000 overview entries (iterated by j)
//after 5000 iterations of i, 10,000,000 entries will be made (5000*2000)
const seedOverview = function (start, numOfDocs) {
  
  if (start < numOfDocs / 1000) {
    let bulkData = [];
    for (let i = 0; i < 1000; i++) {
      let uniqueIdentifier = start * 1000 + i + 1;
      bulkData.push({
        _id: uniqueIdentifier.toString(),
        game_name: faker.random.word(),
        description: faker.lorem.paragraph(),
        release_date: faker.date.past().toISOString(),
        developer: faker.company.companyName(),
        publisher: faker.company.companyName(),
        tags: faker.random.word()
      });
    }
    overviewDb.bulk({ docs: bulkData }).then(function () {
      start++;
      seedOverview(start, numOfDocs);
      console.log('bulk of overview db accessed at i:', start*1000);
    }).catch(function (err) {
      console.error(err);
    })
  }
  

}
seedOverview(0, 10000000);

//http://127.0.0.1:5984/_utils/#/_all_dbs

