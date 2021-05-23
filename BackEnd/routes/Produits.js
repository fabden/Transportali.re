// Imports
const express = require('express');

const Produits = express.Router();

// import controleur

const ctrlProduits = require('../Controleurs/ctrlProduits');

// enregistrement un produits en base de donnees
Produits.route('/')
  .get(ctrlProduits.CreationProduits);

// Export
module.exports = Produits;
