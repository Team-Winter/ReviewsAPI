CREATE INDEX single_reviews on reviews(product_id);
ANALYZE;

CREATE INDEX multi_reviews_where on reviews(product_id, reported);
ANALYZE;

CREATE INDEX multi_reviews_all on reviews(product_id, reported, rating, date, summary, body, recommended, reviewer_name, response, helpfulness);
ANALYZE;

CREATE INDEX single_photos on photos(review_id);
ANALYZE;

CREATE INDEX multi_photos on photos(review_id, url);
ANALYZE;