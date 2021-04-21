// Imports
const express = require('express');
const mongoose = require('mongoose');

// import routes

const routeDevisColis = require('./routes/devisColis');
const routeDevisDemenagemnt = require('./routes/devisDemenagements');
const routePartenaires = require('./routes/Partenaires');

// import midelware

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

// Analyse les corps de requête entrants dans le middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

console.log(process.env.KEY_BOX_MAP);

app.use('/devis-colis', routeDevisColis);
app.use('/devis-demenagement', routeDevisDemenagemnt);
app.use('/devis-partenaire', routePartenaires);

// export
module.exports = app;
