// Import
const mongoose = require('mongoose');

// Schema pour devis Demenagements
const modelDevisDemenagement = mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  urlImage: { type: String },

});

// export schema devis Demenagements
module.exports = mongoose.model('devisColis', modelDevisDemenagement);
