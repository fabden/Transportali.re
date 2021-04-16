// Imports
const express = require('express');

const devisDemenagemntRouteur = express.Router();

// import controleur

const ctrlDemenagements = require('../Controleurs/ctrlDemenagements');

// enregistrement un devis demaenagement en base de donnees
devisDemenagemntRouteur.route('/')
  .get(ctrlDemenagements.generateurPDFDemenagements);

// Export
module.exports = devisDemenagemntRouteur;
