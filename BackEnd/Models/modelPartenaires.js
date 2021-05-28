// Import
const mongoose = require('mongoose');

// Schema pour Partenaires
const modelPartenaires = mongoose.Schema({
  nom_partenaire: { type: String, required: true },
  contact_partenaire: { type: String, require: true },
  adresse_partenaire: { type: String, require: true },
  code_postale_partenaire: { type: String, require: true },
  email_partenaire: { type: String, required: true },
  telephone_partenaire: { type: Number, required: true },
  password: { type: String, required: true },
});

// export schema pour Partenaires
module.exports = mongoose.model('Partenaires', modelPartenaires);
