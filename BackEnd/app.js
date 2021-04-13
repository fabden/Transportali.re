// Imports
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connection a la base de donnees

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/transportali', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connexion à MongoDB réussie !');
  } catch (err) {
    console.log('Connexion à MongoDB échouée !', err);
  }
};
connectDB();


// export
module.exports = app;
