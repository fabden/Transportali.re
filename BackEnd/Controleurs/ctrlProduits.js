const Produits = require('../Models/modelProduits');

// consultation tout produits
exports.consustationTousProduits = (req, res, next) => {
  Produits.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// creation produits
exports.CreationProduits = (req, res, next) => {
  const nouveauproduit = new Produits({
    nom_produits: req.body.nom_produits,
    longeur_produits: req.body.longeur_produits,
    largeur_produits: req.body.largeur_produits,
    poids_produits: req.body.poids_produits,
  });

  nouveauproduit.save()
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => { console.log(e); });
};

// modifiction produits
exports.modificationProduits = (req, res, next) => {

};
// suppression produits
exports.suppresionProduits = (req, res, next) => {

};
