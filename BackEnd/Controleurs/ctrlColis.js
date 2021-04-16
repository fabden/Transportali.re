const PDFDocument = require('pdfkit');
const shemaDeviscolis = require('../Models/modelDevisColis');

// generer PDF
exports.generateurPDFColis = (req, res) => {
  console.log('midelware generation pdf ');

  const doc = new PDFDocument();
  // doc.pipe(fs.createWriteStream('./telechargement/file.pdf')); // write to PDF
  doc.text('Bon envoi colis a scanner par le livreur', 100, 100);
  doc.end();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=DevisColisDenDistri.pdf');
  res.status(200);
  doc.pipe(res); // HTTP response
};

// enregistrement devis colis en base de donnees
exports.enregistrementsDataBase = (req, res, next) => {
  const nouveauDevisColis = new shemaDeviscolis({
    expediteur: {
      nom: req.body.expediteur.nom,
      prenom: req.body.expediteur.prenom,
      adresse: req.body.expediteur.adresse,
      code_postale: req.body.expediteur.code_postale,
      email: req.body.expediteur.email,
      telephone: req.body.expediteur.telephone,
      commentaire: req.body.expediteur.commentaire,
    },
    destinataire: {
      nom: req.body.destinataire.nom,
      prenom: req.body.destinataire.prenom,
      adresse: req.body.destinataire.adresse,
      code_postale: req.body.destinataire.code_postale,
      email: req.body.destinataire.email,
      telephone: req.body.destinataire.telephone,
      commentaire: req.body.destinataire.commentaire,
    },
    reference_colis: {
      numero: req.body.reference_colis.numero,
      date_enregistrement: req.body.reference_colis.date_enregistrement,
      etat: {
        livraison: req.body.reference_colis.etat.livraison,
        payement: req.body.reference_colis.etat.payement,
      },
      types: req.body.reference_colis.types,
    },
  });
  nouveauDevisColis.save()
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
// consultation tous les colis  en base de donnees

exports.tousDeviscolis = (req, res) => {
  shemaDeviscolis.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};
