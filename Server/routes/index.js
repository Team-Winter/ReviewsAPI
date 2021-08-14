const express = require('express');
const { reviews } = require('../controllers');

const router = express.Router();

router.get('/', reviews.get);
module.exports = router;
