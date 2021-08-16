const makeQuery = require('./connection');

const readMetaReviews = async (productId) => {
  const text = `SELECT
    ratings_meta.product_id, JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) ratings,
    (
      SELECT JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count)
      FROM recommended_meta
      WHERE recommended_meta.product_id = $1
      GROUP BY recommended_meta.product_id
    )
    AS recommended,
    (
      SELECT JSON_OBJECT_AGG(characteristic_name, JSON_BUILD_OBJECT('id', id, 'value', avg))
      FROM characteristics_meta
      WHERE product_id = $1
      GROUP BY product_id
    )
    AS characteristics
    FROM ratings_meta
    WHERE ratings_meta.product_id = $1
    GROUP BY ratings_meta.product_id`;
  const values = [productId];
  const query = { text, values };

  return makeQuery(query, 'READ META REVIEWS');
};

module.exports = {
  read: readMetaReviews,
};

// SELECT JSON_OBJECT_AGG(characteristic_name, JSON_BUILD_OBJECT('id', id, 'value', avg)) AS characteristics FROM characteristics_meta WHERE product_id = 1 GROUP BY product_id
