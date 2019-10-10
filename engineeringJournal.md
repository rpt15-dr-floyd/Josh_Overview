# Engineering Journal

## Tues Oct 1st

#### Adding CRUD operations POST
###### Edits in index.js in db folder:
- commented out Stephen's mongodb connection on lines 7-11 in index.js in db folder
- wrote new function called makeNewGameOverview that saves newGame info
- Oops, Stephen already had a POST function named 'save'
- Commented out my code, using Stephen's save function

#### Adding CRUD Operations Delete, Put
- db function called 'updateGameOverview' for PUT
- db function called 'deleteGameOverview' for DELETE

###### Edits in index.js in server folder:
- added CRUD OPERATIONs Delete, Put, Post in server index file
- Tested with Postman
- Works!

## Wed Oct 2nd
- Can't get sql to work
- Set up OH to fix sql 
- Decided with TM Alex it was a problem my bash_profile and that was affecting mysql command path
- Computer froze, just re-started
- My bash_profile file doesn't seem to be working? Can't use any commands now
- Now instead of just mysql command not working...no command will work...vim, cat, ls, cd...
- Terminal broken ): wat do
- Can't commit because vim command won't work
- Need to get on the road to Santa Barbara for job, will fix later

## Thurs Oct 3rd
- Using Lizzy's laptop now instead of my computer, will fix my terminal on my computer later (might have to reinstall MacOS?)
- Wish I commited more often ): 
- Re-doing my commits

Decided on Postgres - was easier to get working with commandline than sql
- Used https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/ to get Postgres installed (via homebrew)

Important commands to remember for later:
- to start instance of Postgres, ran command ```brew services start postgresql```
- default Postgres values: 
```port default: "5432", user default: "elizabethschmitt" ```

Postgres index.js setup
- import/require pg and assign to Pool. "pools" your data with ```const Pool = require('pg').Pool```
- 

Postgres functions
- saveToPostgres function saves gameInfo to postgres database table

## Tues Oct 8th

### CouchDB

#### Set-Up
- Downloaded from https://couchdb.apache.org/
- Downloaded nano with npm (see https://www.npmjs.com/package/nano)
- Used https://docs.couchdb.org/en/stable/setup/single-node.html 

#### Index.js for CouchDb
- import nano
- added script "couch:setup": "node db/couch/index.js" to package.json
- added script "couch:seed": "node db/couch/seed.js" to package.json
- 



#### Seeds.js for CouchDB
- import faker for making fake data



### Postgres

#### Index.js for Postgres
- npm install pg --save
- import sequelize
- added script "postgres:setup": "node db/postgres/index.js" to package.json
- added script "postgres:seed": "node db/postgres/seed.js" to package.json
- authenticate function
- use sequelize constructor to make new database called 'overview'
- ^ didn't work- had to manually make new db called overview in psql shell ```CREATE DATABASE overview;```
- made new model called overviewModel
- exported overviewModel to use in seed script file, seed.js



#### Seeds.js for Postgres
- import faker for making fake data
- import OverviewModel from index.js
- created seedOverview func that pushes new random faker values to temporary array that is then used by bulkCreate method
- 5000 loops of i x 5000 loops of j = 10,000,000 seeds
