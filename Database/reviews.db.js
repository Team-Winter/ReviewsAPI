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

const reportReview = async () => {
};

module.exports = {
  read: readReviews,
  create: createReview,
  update: {
    incrementHelpful,
    reportReview,
  },
};