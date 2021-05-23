const Produits = require('../Models/modelProduits');

// consultation tout produits
exports.consustationTousProduits = (req, res, next) => {

};

// creation produits
exports.CreationProduits = (req, res, next) => {
  const nouveauproduit = new Produits({
    nom_produits: "req.body.nom_produits",
    longeur_produits: 5,
    largeur_produits: 4,
    poids_produits: 5,
  });

  nouveauproduit.save()
    .then((e) => { console.log(`produits enregister${e}`); })
    .catch((e)=>{console.log(e);});
};

// modifiction produits
exports.modificationProduits = (req, res, next) => {

};
// suppression produits
exports.suppresionProduits = (req, res, next) => {

};
