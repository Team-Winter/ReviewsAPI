const { metaReviews } = require('../services');

const { readMetaReviews } = metaReviews;

const getMetaReviews = (req, res, next) => {
  const { query } = req;
  const { product_id } = query;

  readMetaReviews(product_id)
    .then((wantedMeta) => {
      console.log('7.) Sending back meta reviews');
      res.send(wantedMeta);
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

module.exports = {
  get: getMetaReviews,
};
