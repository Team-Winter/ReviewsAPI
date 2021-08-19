-- ////////////////////////////////////////////////////
-- /////////////////   CREAT TABLES    ////////////////
-- ////////////////////////////////////////////////////

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

-- ////////////////////////////////////////////////////
-- /////////////////    LOAD CSV's    /////////////////
-- ////////////////////////////////////////////////////

copy reviews
from '/seed/reviews.csv'
delimiter ','
CSV HEADER;

copy photos
from '/seed/reviews_photos.csv'
delimiter ','
CSV HEADER;

copy characteristics
from '/seed/characteristics.csv'
delimiter ','
CSV HEADER;

copy characteristic_reviews
from '/seed/characteristic_reviews.csv'
delimiter ','
CSV HEADER;

-- ////////////////////////////////////////////////////
-- /////////////////    META DATA      ////////////////
-- ////////////////////////////////////////////////////

DROP TABLE IF EXISTS ratings_meta;
CREATE TABLE ratings_meta AS
SELECT product_id, rating, COUNT (RATING)
FROM reviews
GROUP BY product_id, rating;

DROP TABLE IF EXISTS recommended_meta;
CREATE TABLE recommended_meta AS
SELECT product_id, recommended, COUNT (recommended)
FROM reviews
GROUP BY product_id, recommended;

DROP TABLE IF EXISTS characteristics_meta;
CREATE TABLE characteristics_meta AS
SELECT characteristics.id, characteristics.product_id, characteristics.characteristic_name, AVG (characteristic_reviews.char_value) FROM characteristics, characteristic_reviews WHERE characteristics.id = characteristic_reviews.characteristic_id GROUP BY characteristics.id, characteristics.product_id, characteristics.characteristic_name;

-- ////////////////////////////////////////////////////
-- /////////////////    INDEXING      /////////////////
-- ////////////////////////////////////////////////////

CREATE INDEX single_reviews on reviews(product_id);
ANALYZE;

CREATE INDEX multi_photos on photos(review_id, url);
ANALYZE;

CREATE INDEX single_metaRatings on ratings_meta(product_id);
ANALYZE;

CREATE INDEX single_meta_recommended ON recommended_meta(product_id);
ANALYZE;

CREATE INDEX single_characteristics_meta ON characteristics_meta(product_id);
ANALYZE;