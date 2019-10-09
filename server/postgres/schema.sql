DROP DATABASE IF EXISTS gameInfo;

CREATE DATABASE gameInfo;


CREATE TABLE gameInfoTable (
  id SERIAL, 
  game_name VARCHAR(50),
  game_Id INT,
  game_description VARCHAR(50),
  release_date VARCHAR(50),
  developer VARCHAR(50),
  publisher VARCHAR(50), 
  tags ARRAY
); 