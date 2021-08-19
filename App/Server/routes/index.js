const express = require('express');
const { reviews, metaReviews } = require('../controllers');

const router = express.Router();

router.get('/', reviews.get);
router.get('/meta', metaReviews.get);
router.post('/', reviews.post);
router.put('/:review_id/helpful', reviews.put.incrementHelpful);
router.put('/:review_id/report', reviews.put.reportReview);
module.exports = router;
