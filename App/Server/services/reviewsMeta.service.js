const { metaReviews } = require('../../Database');

const readMetaReviews = async (productId) => {
  const productMeta = await metaReviews.read(productId);
  return productMeta[0];
};

module.exports = {
  readMetaReviews,
};
