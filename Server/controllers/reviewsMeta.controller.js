const { metaReviews } = require('../services');

const { readMetaReviews } = metaReviews;

const getMetaReviews = (req, res, next) => {
  const { query } = req;
  const { product_id } = query;

  readMetaReviews(product_id)
    .then()
    .catch();
};

module.exports = {
  get: getMetaReviews,
};
