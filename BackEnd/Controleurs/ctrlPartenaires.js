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
exports.consultationTouspartenaires = (req, res, next) => {
  Partenaires.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// creation partenaires
exports.Creationpartenaires = (req, res, next) => {
  const nouveauproduit = new Partenaires({
    nom_partenaire: req.body.nom_partenaire,
    contact_partenaire: req.body.contact_partenaire,
    adresse_partenaire: req.body.adresse_partenaire,
    code_postale_partenaire: req.body.code_postale_partenaire,
    email_partenaire: req.body.email_partenaire,
    telephone_partenaire: req.body.telephone_partenaire,
    password: 'toto',
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
      nom_partenaire: req.body.nom_partenaire,
      contact_partenaire: req.body.contact_partenaire,
      adresse_partenaire: req.body.adresse_partenaire,
      code_postale_partenaire: req.body.code_postale_partenaire,
      email_partenaire: req.body.email_partenaire,
      telephone_partenaire: req.body.telephone_partenaire,
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
