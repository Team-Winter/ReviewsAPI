const { Pool } = require('pg');

const poolConfig = {
  host: 'sdc-postgres', // local host on local machine || sdc-postgres on local docker || postgres ip on ec2
  user: 'postgres', // 'keanu', on local machine || postgres in docker || postgres ec2
  max: 10,
  password: 'myCoolPassword',
  database: 'reviews',
  port: '5432', // 5432 on local machine || 5432 on local docker instance || 5432 on ec2
  // config info here
  // if use a pword require config file and import pword from there
};
const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const makeQuery = async (query, title) => {
  try {
    console.log(`---------- ${title} ---------`);
    console.log('1.) Attempting to connect to Pool');

    const beforePoolConnect = new Date();
    const client = await pool.connect();
    const afterPoolConnect = new Date();

    console.log('2.) Successfully connected to Pool, client checked out. TIME TO CONNECT: ', afterPoolConnect - beforePoolConnect, ' ms');
    try {
      // some sort of helper to verify the values are valid
      console.log(`3.) Attempting to query DB for ${title}`);

      const beforeQuery = new Date();
      const queryRes = await client.query(query);
      const afterQuery = new Date();

      console.log(`4.) Successful query made for ${title}. TIME TO QUERY: `, afterQuery - beforeQuery, ' ms');
      return queryRes.rows;
    } catch (err) {
      console.log('4.) Error queryind data: ', err);

      throw new Error('Error querying DB', { cause: err });
    } finally {
      console.log('5.) returning client to pool');

      client.release();
      console.log('6.) client returned to pool');
    }
  } catch (err) {
    // handle error from inner try/catch block
    if (err.message === 'Error querying DB') {
      throw err;
    }

    // throw custom error if connection to pool fails
    console.log('3.) Error connecting to pool: ', err);
    throw new Error('DB Pool Connection Error', { cause: err });
  }
};

module.exports = makeQuery;
