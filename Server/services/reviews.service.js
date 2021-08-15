const { reviews } = require('../../Database');

const readReviews = async (productId, page = 0, count = 5, sort) => {
  // set default for sort?

  const results = await reviews.read(productId, page, count, sort);
  return {
    product: productId,
    page,
    count,
    results,
  };

  // if (results.length < 1) {
  //   throw new Error('No results Found');
  // }
  // trying to verify results are valid but a product could have no reviews
  // so shouldnt throw an error there
  // instead write helpers to verify query params are valid
};

const createReview = async () => {

};

const updateHelpful = async () => {

};

const updateReported = async () => {

};

module.exports = {
  readReviews,
  createReview,
  updateHelpful,
  updateReported,
};
