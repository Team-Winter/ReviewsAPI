const makeQuery = require('./connection');

const readReviews = async (productId, limit, offset, orderBy) => {
  // create query before connecting to pool.
  // probably negligible but avoids doing work while holding onto a client
  // create slightly more space if pool connection fails - it was unnessary to create query

  // can I name a query that changes based on params or does it have to be an identical query?
  // const name = 'Get Product';
  const text = `SELECT reviews.id as review_id, reviews.rating, reviews.date, reviews.summary, reviews.body, reviews.recommended, reviews.reviewer_name, reviews.response, reviews.helpfulness, (
    SELECT COALESCE(json_agg(reviewPhotos), '[]'::JSON)
    FROM (
      SELECT photos.id, photos.url
      FROM photos
      WHERE photos.review_id = reviews.id
    ) reviewPhotos
  ) AS photos
  FROM reviews
  WHERE reviews.product_id = $1 AND reviews.reported = 'f'
  ORDER BY ${orderBy}
  LIMIT $2 OFFSET $3`;

  const values = [productId, limit, offset];
  // page 0 is the first page, would need (page - 1) * count
  // for page 1 to be first page. consider later.

  const query = { text, values };

  return makeQuery(query, 'READ REVIEWS');
};

const createReview = async () => {
};

const incrementHelpful = async (reviewId) => {
  const text = 'UPDATE reviews SET helpfulness = helpfulness+1 WHERE id = $1';
  const values = [reviewId];

  const query = { text, values };

  return makeQuery(query, `UPDATE REVIEW #${reviewId} HELPFUL`);
};

const reportReview = async (reviewId) => {
  const text = `UPDATE reviews
  SET reported = 't'
  WHERE id = $1`;
  const values = [reviewId];

  const query = { text, values };

  return makeQuery(query, `UPDATE REVIEW #${reviewId} REPORTED`);
};

module.exports = {
  read: readReviews,
  create: createReview,
  update: {
    incrementHelpful,
    reportReview,
  },
};
// helpfulness default set to 0
// response default set to null
// reported default set to false
// date default set to current time
// id should auto increment
// unique id required?

// INSERT INTO reviews (product_id, rating, summary, body, recommended, reviewer_name, reviewer_email)

// WITH new_review AS (
//   INSERT INTO reviews (product_id, rating, summary, body, recommended, reviewer_name, reviewer_email)
//   VALUES (1, 5, 'it was good', 'I like the part wher it did', true, 'keeks', 'first@last.com')
//   returning *
// ), review_photos AS (
//   INSERT INTO photos (review_id, url)
//   VALUES (new_review.id, "http://www.myCoolPhoto.com")
// ), review_char_reviews AS (
//   INSERT INTO characteristic_reviews (characteristic_id, review_id, char_value)
//   VALUES (char_id1, new_review.id,  5),
//   VALUES (char_id2, new_review.id,  5),
//   VALUES (char_id3, new_review.id,  5)
// ), AS ratings_meta_update (
//   UPDATE ratings_meta
//   SET count = count+1
//   WHERE rating = new_review.rating AND product_id = new_review.product_id
// ), AS rec_meta_update (
//   INSERT INTO recommended_meta
//   SET count = count+1
//   WHERE recommended = new_review.recommended AND product_id = new_review.product_id
// ), AS char_meta_update {  // THOUGHTS: should I store the review count in this object so I can deconstruct the average quickly, can I update 2 values synchronously in the same row in a single update statement?
//   UPDATE characteristics_meta // am I going to have to iterate both photos array and characterisitics object to create this post?
//   SET avg = avg *
// }


// SELECT reviews.id as review_id, reviews.rating, reviews.date, reviews.summary, reviews.body, reviews.recommended, reviews.reviewer_name, reviews.response, reviews.helpfulness, (
//   SELECT COALESCE(json_agg(reviewPhotos), '[]'::JSON)
//   FROM (
//     SELECT photos.id, photos.url
//     FROM photos
//     WHERE photos.review_id = reviews.id
//   ) reviewPhotos
// ) AS photos
// FROM reviews
// WHERE reviews.product_id = 100 AND reviews.reported = 'f'
// ORDER BY reviews.date DESC
// LIMIT 5 OFFSET 0