// store data for reservations
CREATE DATABASE reservationsll;


// Make an Reservation Table 

CREATE TABLE reservations3( 
reservation_id SERIAL PRIMARY KEY,
description VARCHAR(250)
);
 

 CREATE TABLE todo( 
todo_id SERIAL PRIMARY KEY,
description VARCHAR(250)
);

DROP TABLE reservations;

ALTER TABLE reservations
ALTER COLUMN id TYPE SERIAL,

SELECT * FROM reservations;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
