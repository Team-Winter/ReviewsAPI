const { metaReviews } = require('../../Database');

const readMetaReviews = async (productId) => (metaReviews.read(productId));

module.exports = {
  readMetaReviews,
};
