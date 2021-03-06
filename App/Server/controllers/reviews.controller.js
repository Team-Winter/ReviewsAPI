const { reviews } = require('../services');

const { readReviews, createReview, updateHelpful, updateReported } = reviews;

const getReviews = (req, res, next) => {
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
};

const postReview = (req, res, next) => {
  // call postReview from servicves
  // next();
};

const incrementHelpful = (req, res, next) => {
  // call putReview(increment) from servicves
  const { params } = req;
  const { review_id } = params;
  updateHelpful(review_id)
    .then(() => {
      console.log('7.) Sending back 204');
      res.sendStatus(204);
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
  // next();
};

const reportReview = (req, res, next) => {
  const { params } = req;
  const { review_id } = params;
  updateReported(review_id)
    .then(() => {
      console.log('7.) Sending back 204');
      res.sendStatus(204);
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
