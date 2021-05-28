// Imports
const express = require('express');

const PartenairesRouteur = express.Router();

// import controleur

const ctrlPartenaires = require('../Controleurs/ctrlPartenaires');

// enregistrement un colis en base de donnees
PartenairesRouteur.route('/')
  .get(ctrlPartenaires.consultationTouspartenaires)
  .post(ctrlPartenaires.Creationpartenaires)
  .delete(ctrlPartenaires.suppresionpartenaires)
  .put(ctrlPartenaires.modificationpartenaires);

PartenairesRouteur.route('/connexion')
  .post(ctrlPartenaires.connexionPartenaire);

// Export
module.exports = PartenairesRouteur;
