const { reviews } = require('../../Database');

const readReviews = async (productId, page = 0, count = 5, sort) => {
  // set default for sort?

  let orderBy = 'reviews.date DESC'; // default case here
  if (sort === 'relevent') {
    // orderBy = '';
  } else if (sort === 'helpful') {
    orderBy = 'reviews.helpfulness DESC';
  }
  // } else if (sort === 'newest') {
  // derfault case goes last with no if statement - remove newest?
  // // might not need alltogether if I set default above
  //   // orderBy = '';
  // }

  const results = await reviews.read(productId, count, count * page, orderBy);
  return {
    product: productId,
    page,
    count: results.length, // should this be count returned or count requested?
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

const updateHelpful = async (reviewId) => (reviews.update.incrementHelpful(reviewId));

const updateReported = async () => {

};

module.exports = {
  readReviews,
  createReview,
  updateHelpful,
  updateReported,
};
