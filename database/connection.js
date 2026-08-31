// database/connection.js
const mongoose = require('mongoose');
const { mongoURI } = require('../utils/config');

mongoose.connect(mongoURI)
  .then(() => {
    console.log("CONNECTED TO THE DB");
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });