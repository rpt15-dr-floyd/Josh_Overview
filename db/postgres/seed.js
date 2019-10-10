const {OverviewModel} = require('./index.js');
const faker = require('faker');
// console.log(OverviewModel);

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
    OverviewModel.bulkCreate({ docs: docsArr }).then(function () {
      i++;
      //recursive call
      seedOverview(i);
      console.log('bulk of overview db accesse at i:', i);
    }).catch(function (err) {
      console.error(err);
    })
  }
  

}
seedOverview(0);