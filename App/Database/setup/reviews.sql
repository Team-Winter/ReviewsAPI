DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews

CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR,
  body VARCHAR(1000) NOT NULL,
  recommended BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  response VARCHAR(1000),
  helpfulness INT
);

CREATE TABLE photos (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  review_id INT NOT NULL REFERENCES reviews,
  url VARCHAR
);

CREATE TABLE characteristics (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  characteristic_name VARCHAR NOT NULL
);

CREATE TABLE characteristic_reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL REFERENCES characteristics,
  review_id INT NOT NULL REFERENCES reviews,
  char_value REAL NOT NULL
);
