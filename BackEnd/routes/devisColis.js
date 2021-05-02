// Imports
const express = require('express');
const ctrlColis = require('../Controleurs/ctrlColis');

// import controleur
const devisColisRouteur = express.Router();

// enregistrement un colis en base de donnees
devisColisRouteur.route('/')
  .post(ctrlColis.calculateurDistancePrix)
  .put(ctrlColis.generateurPDFColis);
devisColisRouteur.route('/pdf')
  .get(ctrlColis.generateurPDFColis);

// Export

module.exports = devisColisRouteur;
