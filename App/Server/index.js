const express = require('express');
// const cors = require('cors'); // need to install cors if I use this line
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/reviews', router);

app.get('./loaderio-e8dd4d0b20dfe5eb65ab2b654f19504a*', (req, res) => {
  res.send('loaderio-e8dd4d0b20dfe5eb65ab2b654f19504a');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
