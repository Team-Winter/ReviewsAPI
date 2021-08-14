// import pg node stuff

const readReviews = () => {
  // need to actually pull info here
};

module.exports = {
  readReviews,
};

// SELECT *, ARRAY [ SELECT ARRAY [ photos.id, photos.url ] FROM photos WHERE reviews.id = photos.review_id ] FROM reviews WHERE reviews.product_id = 2;

// SELECT review_id, JSON_AGG(photoid, photos.url) FROM photos group by review_id;

// SELECT JSON_GG

// SELECT row_to_json(review) as wantedReviews from( select reviews.id, reviews.rating, reviews.date, reviews.summary, body, recommended, reviewer_name, response, helpfulness, (select json_agg(reviewPhotos) from ( select photos.id, photos.url from photos where review_id = reviews.id ) reviewPhotos ) as photos from reviews where product_id = 2) review;

// select reviews.id, reviews.rating, reviews.date, reviews.summary, body, recommended, reviewer_name, response, helpfulness, (select json_agg(reviewPhotos) from ( select photos.id, photos.url from photos where review_id = reviews.id ) reviewPhotos ) as photos from reviews where product_id = 2