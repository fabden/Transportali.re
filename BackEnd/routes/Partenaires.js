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

PartenairesRouteur.route('/:id')
  .get(() => {console.log("modif un partenaire")})
  .post(() => {})
  .delete(() => {})
  .put(() => {});

PartenairesRouteur.route('/connexion')
  .post(ctrlPartenaires.connexionPartenaire)
  .put(ctrlPartenaires.checkconnexionPartenaire);

  
PartenairesRouteur.route('/commande')
  .post(ctrlPartenaires.commandePartenaire)
  .get(ctrlPartenaires.livraisonPartenaire)
  .put()
  .delete(() => {});

// Export
module.exports = PartenairesRouteur;
