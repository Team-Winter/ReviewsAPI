const makeQuery = require('./connection');

const readMetaReviews = async (productId) => {
  const text = '';
  const values = [productId];
  const query = { text, values };

  return makeQuery(query, 'READ META REVIEWS');
};

module.exports = {
  read: readMetaReviews,
};
