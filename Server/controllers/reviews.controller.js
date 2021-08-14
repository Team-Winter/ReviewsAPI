const { reviews } = require('../services');

const { readReviews } = reviews;

const getReviews = (req, res, next) => {
  // params and other req info stripped off here

  // call function fromn services that takes info from req (readReviews)
  // send back response or handle error
};

module.exports = {
  get: getReviews,
};
