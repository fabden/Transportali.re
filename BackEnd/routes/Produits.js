// Imports
const express = require('express');

const Produits = express.Router();

// import controleur

const ctrlProduits = require('../Controleurs/ctrlProduits');

// enregistrement un produits en base de donnees
Produits.route('/')
  .get(ctrlProduits.consustationTousProduits)
  .post(ctrlProduits.CreationProduits)
  .delete(() => {})
  .put(ctrlProduits.modificationProduits);

Produits.route('/:id')
  .get(() => {})
  .post(() => {})
  .delete(ctrlProduits.suppresionProduits)
  .put(() => {});

// Export
module.exports = Produits;
