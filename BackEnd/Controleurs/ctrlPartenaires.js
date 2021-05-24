const PDFDocument = require('pdfkit');
const Partenaires = require('../Models/modelPartenaires');

exports.generateurPDFPartenaires = (req, res) => {
  console.log('midelware generation pdf ');

  const doc = new PDFDocument();
  // doc.pipe(fs.createWriteStream('./telechargement/file.pdf')); // write to PDF
  doc.text('Bon envoi Partenaires a scanner par le livreur', 100, 100);
  doc.end();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=DevisPartenairesDenDistri.pdf');
  res.status(200);
  doc.pipe(res); // HTTP response
};

// consultation tout partenaires
exports.consustationTouspartenaires = (req, res, next) => {
  Partenaires.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// creation partenaires
exports.Creationpartenaires = (req, res, next) => {
  const nouveauproduit = new Partenaires({
    nom_produits: req.body.nom_produits,
    longeur_produits: req.body.longeur_produits,
    largeur_produits: req.body.largeur_produits,
    hauteur_produits: req.body.hauteur_produits,
    poids_produits: req.body.poids_produits,
  });

  nouveauproduit.save()
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => { console.log(e); });
};

// modification partenaires
exports.modificationpartenaires = (req, res, next) => {
  const { _id } = req.body;
  console.log(req.body._id);
  Partenaires.updateOne({ _id },
    {
      nom_produits: req.body.nom_produits,
      longeur_produits: req.body.longeur_produits,
      largeur_produits: req.body.largeur_produits,
      hauteur_produits: req.body.hauteur_produits,
      poids_produits: req.body.poids_produits,
    })
    .then((e) => {
      console.log('parteniares modifier sur sevreur ');
      res.status(200).json({
        message: 'Élément modifié',
      });
    })
    .catch((e) => { console.log(e); });
};

// suppression partenaires
exports.suppresionpartenaires = (req, res, next) => {
  const { id } = req.query;
  Partenaires.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({
        message: 'Élément supprimé',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
