const { reviews } = require('../services');

const { readReviews, createReview, updateHelpful, updateReported } = reviews;

const getReviews = (req, res, next) => {
  // params and other req info stripped off here
  const { query } = req;
  const {
    product_id,
    page,
    count,
    sort,
  } = query;

  readReviews(product_id, page, count, sort)
    .then((wantedReviews) => {
      console.log('7.) Sending back reviews');
      res.send(wantedReviews);
      // next();
    })
    .catch((err) => {
      if (err.message === 'Error querying DB') {
        console.log('7.) Sending back 400 error code');
        res.sendStatus(400);
      } else if (err.message === 'DB Pool Connection Error') {
        console.log('7.) Sending back 500 error code');
        res.sendStatus(500);
      } else {
        console.log('unknown Error: ', err);
        res.sendStatus(500);
      }
    });
  // call function fromn services that takes info from req (readReviews)
  // send back response or handle error
};

const postReview = (req, res, next) => {
  // call postReview from servicves
  // next();
};

const incrementHelpful = (req, res, next) => {
  // call putReview(increment) from servicves
  // next();
};

const reportReview = (req, res, next) => {
  // call putReview from servicves
  // next();
};

module.exports = {
  get: getReviews,
  post: postReview,
  put: {
    incrementHelpful,
    reportReview,
  },
};
