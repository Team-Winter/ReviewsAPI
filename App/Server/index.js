const express = require('express');
// const cors = require('cors'); // need to install cors if I use this line
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/reviews', router);

const port = 3000;

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
