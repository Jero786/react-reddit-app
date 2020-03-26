require('dotenv').config();

const express = require('express');
const {router} = require('./routes');
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');

express()
.use(cors())
.use(express.static(path.join(__dirname, 'build')))
.use('/api', router)
.get('/', (_, res) => res.render('build/index'))
.listen(port, () => {
  console.log(`Listening in port ${port}`);
});