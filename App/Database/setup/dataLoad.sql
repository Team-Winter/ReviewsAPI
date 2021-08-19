copy reviews
-- from '/reviews.csv'
from '/home/keanu/Documents/hackreactor/CO1813/sdc/Data/reviews.csv'
delimiter ','
CSV HEADER;

copy photos
from '/home/keanu/Documents/hackreactor/CO1813/sdc/Data/reviews_photos.csv'
delimiter ','
CSV HEADER;

copy characteristics
from '/home/keanu/Documents/hackreactor/CO1813/sdc/Data/characteristics.csv'
delimiter ','
CSV HEADER;

copy characteristic_reviews
from '/home/keanu/Documents/hackreactor/CO1813/sdc/Data/characteristic_reviews.csv'
delimiter ','
CSV HEADER;
