// Import
const mongoose = require('mongoose');

// Schema pour devis colis
const modelDevisColisSchema = mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  urlImage: { type: String },

});

// export schema devi colis
module.exports = mongoose.model('devisColis', modelDevisColisSchema);
