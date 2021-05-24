// Imports
const express = require('express');
const mongoose = require('mongoose');

// import routes

const routeDevisColis = require('./routes/devisColis');
const routeDevisDemenagemnt = require('./routes/devisDemenagements');
const routePartenaires = require('./routes/Partenaires');
const routeProduits = require('./routes/Produits');

// import midelware

const app = express();

// connection a la base de donnees

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/transportali', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connexion à MongoDB réussie !');
  } catch (err) {
    console.log('Connexion à MongoDB échouée !', err);
  }
};
connectDB();

// autorisation cors

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  next();
});

// Analyse les corps de requête entrants dans le middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.use('/api/devis-colis', routeDevisColis);
app.use('/api/devis-demenagement', routeDevisDemenagemnt);
app.use('/api/partenaires', routePartenaires);
app.use('/api/produits', routeProduits);

// export
module.exports = app;
