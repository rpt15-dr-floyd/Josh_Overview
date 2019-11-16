# 1. SDC Project: Steam Overview

> Cloned from Stephen's Overview microservice from his FEC Project, this SDC project serves to reformat the database from mongo to postsql and couch. Furthermore, it will explore the benefits and drawbacks of both databases. Lastly, it will test the durability and speed of both databases under heavy loads and ultimately conclude with which database is the better choice. 

> The Overview serves to inform the user of the current game they are viewing. This includes the game name, author, publisher, release date, description, and tags of genres the game belongs to. 

## 1.1. Related Projects

  - https://github.com/rpt15-fec-tabata-yoga/stephen_overview - Stephen's microservice: Overview (Original FEC Project)
  - https://github.com/rpt15-dr-floyd/Justin_Features         - Justin's microservice: Features (Current SDC Project)
  - https://github.com/rpt15-dr-floyd/zack-reviews-service    - Zack's microservice: Reviews (Current SDC Project)
  - [Proxy Link Here]                                         - Proxy that runs the seperate microservices

## 1.2. Table of Contents
<!-- TOC -->
1. [Usage](#Usage)
   - [1.3.1 Endpoints](#131-crud-endpoints)
   - [1.3.2 Requirements](#132-requirements)
2. [Engineering Journal](#2-engineering-journal)
   - [2.1.1 PostgreSQL Setup](#211-postgres-setup)
   - [2.1.2 PostgreSQL Seeding](#212-postgres-seed)
   - [2.2.1 CouchDB Setup](#221-couchdb-setup)
   - [2.2.2 CouchDB seed](#222-couchdb-seed)
3. [Speed-Testing]
   - [3.1 Set up Jest to test apis](#31-set-up-jest-to-test-apis)
   - [3.2 Development Setup](#32-development-setup)
   - [3.4 New Relic Setup](#34-new-relic-setup)
   - [3.5 DBMS Benchmarking](#35-dbms-benchmarking)
   - [3.6 Deployment](#36-deployment)
     - [3.6.1 Deployment Benchmarking](#361-deployment-benchmarking)3
   - [3.7 Optimization](#37-optimization)
     - [3.7.1 Understanding PostgreSQL cache](#371-postgres-cache)
     - [3.7.2 Redis Cache](#372-redis-cache)
     - [3.7.4 Custom Load Balancer](#374-custom-load-balancer)
     - [3.7.5 NGINX Load Balancer](#375-nginx-load-balancer)

<!-- /TOC -->
## 1.3. Usage

> Run Proxy from the fourth link under 1.1. Related Projects on port 3000. Run overview on 3001, features on 3002, and reviews on 3003.

### 1.3.1. API endpoints
- `GET api/overview/:gameId` 
  - returns overview data from entry with specified gameId
- `POST api/overview/` 
  - pushes a new entry to the database
- `PUT api/overview/:gameId`
  - edits entry with specified gameId and replaces in database
- `DELETE api/overview/:gameId` 
  - removes entry with specified id from database


### 1.3.2 Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## 2 Engineering Journal:
### 2.1.1 PostgreSQL Setup
1. Use Homebrew to install PostgreSQL
```brew install postgresql```
2. Start Postgres
```brew services start postgresql```
3. Initialize a primary database (This will not be that database used for storing data for this microservice, Overview. Rather it's a database you always return to as your "homebase" database.)
```initdb /usr/local/var/postgres -E utf8```
4. Create an index.js for PostgresSQL (and don't mix up with the CouchDB index.js)
```touch server/postgres/index.js```
5. Install sequelize npm module
``` npm install sequelize --save```
6. Install pg npm module
```npm install pg --save```
7. Import sequelize
``` const sequelize require('sequelize')```
8. Add script "postgres:setup": "node db/postgres/index.js" to package.json
9. Add script "postgres:seed": "node db/postgres/seed.js" to package.json
10. Write Authenticate function
11. Use sequelize constructor to make new database called 'overview'
12. Manually make new db called overview in psql shell ```CREATE DATABASE overview;```
13. Made new model called overviewModel
14. Export overviewModel to use in seed script file, seed.js
15. If postgres commands don't work from terminal, you have a problem with your path
16. To make postgres shell work in terminal run 
```export PATH=/Library/PostgreSQL/9.5/bin:$PATH```

### 2.1.2 PostgresQL Seed.js
1. Import faker for making fake data
2. Import OverviewModel from index.js
3. Creat seedOverview func that pushes new random faker values to temporary array that is then used by bulkCreate method
4. 10000 loops of i and 1000 loops of j inside of that = 10,000,000 seeds (i x j)


### 2.2.1 CouchDB Setup
1. Download from https://couchdb.apache.org/
2. Downloaded nano with npm (see https://www.npmjs.com/package/nano)
3. Use https://docs.couchdb.org/en/stable/setup/single-node.html 
4. Create your server/index.js file for CouchDB
5. Import nano
4. Create an index.js for CouchDB (and don't mix up with the Postgres index.js)
```touch server/couchdb/index.js```
5. Install sequelize npm module
``` npm install sequelize --save```
6. Install pg npm module
```npm install couchdb --save```
7. Import sequelize
``` const sequelize require('sequelize')```
8. Add script "couch:setup": "node db/couch/index.js" to package.json
9. Add script "couch:seed": "node db/couch/seed.js" to package.json
10. Write Authenticate function
11. Use sequelize constructor to make new database called 'overview'
12. Manually make new db called overview in couchDB shell ```CREATE DATABASE overview;```
13. Made new model called overview
14. Export overview to use in seed script file, seed.js
15. If postgres commands don't work from terminal, you have a problem with your path
16. To make postgres shell work in terminal run 
```export PATH=/Library/couchdb/bin:$PATH```


## 3.1 Speed-Testing
