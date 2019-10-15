# 1. SDC Project: Steam Overview

> Cloned from Stephen's Overview microservice from his FEC Project, this SDC project serves to reformat the database from mongo to postsql and couch. Furthermore, it will explore the benefits and drawbacks of both databases. Lastly, it will test the durability and speed of both databases under heavy loads and ultimately conclude with which database is the better choice. The Overview serves to inform the user of the current game they are viewing. This includes the game name, author, publisher, release date, description, and tags of genres the game belongs to. 

## 1.1. Related Projects

  - https://github.com/rpt15-fec-tabata-yoga/stephen_overview - Stephen's microservice: Overview (Original FEC Project)
  - https://github.com/rpt15-dr-floyd/Justin_Features         - Justin's microservice: Features (Current SDC Project)
  - https://github.com/rpt15-dr-floyd/zack-reviews-service    - Zack's microservice: Reviews (Current SDC Project)
  - [Proxy Link Here]                                         - Proxy that runs the seperate microservices

## 1.2. Table of Contents
<!-- TOC -->
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
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


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g psql
npm install -g nano
```

