const makeQuery = require('./connection');

const readMetaReviews = async (productId) => {
  const text = `SELECT
    ratings_meta.product_id, JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) ratings,
    (
      SELECT JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count)
      FROM recommended_meta
      WHERE recommended_meta.product_id = 1
      GROUP BY recommended_meta.product_id
    )
    AS recommended,
    (
      SELECT JSON_OBJECT_AGG(name, char_info)
      FROM (
        SELECT product_id, characteristic_name as name, ROW_TO_JSON(char_metas) AS char_info
        FROM (
          SELECT id, avg as value
          FROM characteristics_meta
          WHERE product_id = 1
        )
        AS char_metas, characteristics_meta
        WHERE characteristics_meta.id = char_metas.id
      ) breakdown
      GROUP BY product_id
    )
    AS characteristics
    FROM ratings_meta
    WHERE ratings_meta.product_id = 1
    GROUP BY ratings_meta.product_id`;
  const values = [productId];
  const query = { text, values };

  return makeQuery(query, 'READ META REVIEWS');
};

module.exports = {
  read: readMetaReviews,
};

// SELECT ratings_meta.product_id, JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) ratings from ratings_meta WHERE product_id = 1 group by product_id;

// SELECT ratings_meta.product_id, JSON_OBJ_AGG(ratings_meta.rating, ratings_meta.count) ratings, JSON_OBJ_AGG(recommended_meta.recommend, recommended_meta.count) recommended FROM ratings_meta, recommended_meta WHERE product_id = 1 GROUP BY product_id;

// SELECT ratings_meta.product_id, JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) ratings, JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count) recommended from ratings_meta, recommended_meta WHERE ratings_meta.product_id = 1 group by product_id;

// SELECT JSON_OBJ_AGG(ratings_meta.rating, ratings_meta.count) ratings FROM ratings_meta WHERE product_id = 1;

// SELECT JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) from ratings_meta WHERE product_id = 1 group by product_id;

// SELECT product_id, (SELECT JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) from ratings_meta WHERE product_id = 1 group by product_id), (SELECT JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count) FROM recommended_meta GROUP BY product_id) FROM ratings_meta where product_id = 1 GROUP BY product_id;

// SELECT JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count) FROM recommended_meta GROUP BY product_id;

// SELECT ratings_meta.product_id, JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) ratings, (SELECT JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count) FROM recommended_meta WHERE recommended_meta.product_id = 1 GROUP BY recommended_meta.product_id) recommended, () characteristics FROM ratings_meta where ratings_meta.product_id = 1 GROUP BY ratings_meta.product_id;

// SELECT product_id, characteristic_name, JSON_OBJECT_AGG(id, avg) characteristic_info FROM characteristics_meta WHERE product_id = 1 GROUP BY product_id, characteristic_name;

// SELECT JSON_OBJECT_AGG (characteristic_name, JSON_OBJECT_AGG(id, avg) FROM characteristics_meta WHERE product_id = 1 GROUP BY characteristic_name) FROM characteristics_meta where product_id = 1 GROUP BY product_id;


// SELECT ROW_TO_JSON(char_meta) characteristic_info FROM ( SELECT id, avg AS value FROM characteristics_meta WHERE product_id = 1) as char_meta;

// SELECT product_id, characteristic_name, (SELECT ROW_TO_JSON(char_meta) FROM ( SELECT id, avg AS value FROM characteristics_meta WHERE product_id = 1) as char_meta) characteristic_info FROM characteristics_meta WHERE product_id = 1 GROUP BY product_id, characteristic_name;

// SELECT product_id, characteristic_name, ROW_TO_JSON(id, avg) characteristic_info FROM characteristics_meta WHERE product_id = 1 GROUP BY product_id, characteristic_name;

// SELECT product_id, characteristic_name, json_onject_agg (id, avg AS value) from characteristics_meta WHERE product_id = 1 GROUP BY product_id, characteristic_name;SELECT ratings_meta.product_id, JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) ratings, (SELECT JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count) FROM recommended_meta WHERE recommended_meta.product_id = 1 GROUP BY recommended_meta.product_id) recommended, (select json_object_agg(name, char_info) from (select product_id, characteristic_name as name, row_to_json(char_metas) as char_info from (select id, avg as value from characteristics_meta where product_id = 1) as char_metas, characteristics_meta  where characteristics_meta.id = char_metas.id) breakdown group by product_id) characteristics FROM ratings_meta where ratings_meta.product_id = 1 GROUP BY ratings_meta.product_id;


// SELECT product_id, characteristic_name, row_to_json(cm) FROM (SELECT id, avg AS value FROM characteristics_meta WHERE product_id = 1) cm, FROM characteristics_meta WHERE characteristic_meta.id = cm.id AND characteristics_meta.avg = cm.value;


// select characteristic_name as name, (select row_to_json(char_metas) from (select id, avg as value from characteristics_meta where product_id = 1 and characteristic_name = name) as char_metas) from characteristics_meta where product_id = 1;


// select json_object_agg(name, char_info) from (select product_id, characteristic_name as name, row_to_json(char_metas) as char_info from (select id, avg as value from characteristics_meta where product_id = 1) as char_metas, characteristics_meta  where characteristics_meta.id = char_metas.id) breakdown group by product_id;


// SELECT ratings_meta.product_id, JSON_OBJECT_AGG(ratings_meta.rating, ratings_meta.count) ratings, (SELECT JSON_OBJECT_AGG(recommended_meta.recommended, recommended_meta.count) FROM recommended_meta WHERE recommended_meta.product_id = 1 GROUP BY recommended_meta.product_id) recommended, (select json_object_agg(name, char_info) from (select product_id, characteristic_name as name, row_to_json(char_metas) as char_info from (select id, avg as value from characteristics_meta where product_id = 1) as char_metas, characteristics_meta  where characteristics_meta.id = char_metas.id) breakdown group by product_id) as characteristics FROM ratings_meta where ratings_meta.product_id = 1 GROUP BY ratings_meta.product_id;

// select characteristic_name, json_build_object('id', id, 'value', avg) from characteristics_meta where product_id = 1;

// select json_object_agg(characteristic_name, json_build_object('id', id, 'value', avg)) as characteristics from characteristics_meta where product_id = 1 group by product_id