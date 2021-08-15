const { Pool } = require('pg');

const poolConfig = {
  host: 'localhost',
  user: 'keanu',
  max: 10,
  password: 'password',
  database: 'reviews',
  // config info here
  // if use a pword require config file and import pword from there
};
const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
