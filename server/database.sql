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