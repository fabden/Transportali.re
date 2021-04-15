// Imports
const express = require('express');

const PartenairesRouteur = express.Router();

// enregistrement un colis en base de donnees
PartenairesRouteur.route('/')
  .get((req, res) => { console.log('chemin partenaires ok'); });

// Export
module.exports = PartenairesRouteur;
