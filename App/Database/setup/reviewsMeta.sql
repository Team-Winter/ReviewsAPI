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
