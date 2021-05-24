// Import
const mongoose = require('mongoose');

// Schema pour Partenaires
const modelLivreurs = mongoose.Schema({
  nom_livreur: { type: String, required: true },
  contact_livreur: { type: String, require: true },
  adresse_livreur: { type: String, require: true },
  code_postale_livreur: { type: String, require: true },
  email_livreur: { type: String, required: true },
  telephone_livreur: { type: Number, required: true },
});

// export schema pour Partenaires
module.exports = mongoose.model('Livreurs', modelLivreurs);
