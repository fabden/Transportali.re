const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const SVGtoPDF = require('svg-to-pdfkit');
const axios = require('axios');
const ShemaDeviscolis = require('../Models/modelDevisColis');
const dataVille = require('../datasVille');
const dataCategory = require('../datasCategorie');

///
// consultation tous les colis  en base de donnees
///

exports.tousDeviscolis = (req, res) => {
  ShemaDeviscolis.find()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

///
// generateur devisColis PDF
///
exports.generateurPDFColis = (req, res) => {
  const doc = new PDFDocument();

  // reiecriture entête d'envois pour telechergment direct
  res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=DevisColisDenDistri.pdf');
  res.status(200);

  doc.text('Bon envoi colis a scanner par le livreur', 100, 100)
    .moveDown(2);
  doc.text(`livraison prevu le : ${req.body.dateLivraison}`)
    .moveDown(2);
  doc.text(`Adresse de livraison : ${req.body.adresseLivraison.adresse}`)
    .moveDown(0);
  doc.text(`ville de livraison : ${req.body.adresseLivraison.code_postale}`)
    .moveDown(0);
  doc.text(`contact de livraison : ${req.body.adresseLivraison.nom_contact}`)
    .moveDown(0);
  doc.text(`telephone contact de livraison : ${req.body.adresseLivraison.telephone_contact}`)
    .moveDown(0);
  doc.text(`commentaire de livraison : ${req.body.adresseLivraison.commentaire_contact}`)
    .moveDown(0);
  doc.text(`mail contact  de livraison: ${req.body.adresseLivraison.mail_contact}`)
    .moveDown(5);
  doc.text(`adresse de destination : ${req.body.adresseChargement.adresse}`)
    .moveDown(0);
  doc.text(`ville  de destination : ${req.body.adresseChargement.code_postale}`)
    .moveDown(0);
  doc.text(`nom contact de destination : ${req.body.adresseChargement.nom_contact}`)
    .moveDown(0);
  doc.text(`telephone contact  : ${req.body.adresseChargement.telephone_contact}`)
    .moveDown(0);
  doc.text(`mail contact de destination : ${req.body.adresseChargement.mail_contact}`)
    .moveDown(0);
  doc.text(`commentaire contact  : ${req.body.adresseChargement.commentaire_contact}`)
    .moveDown(5);
  doc.text(`mail contact de destination : ${req.body.valueCategorie}`)
    .moveDown(0);
  doc.text('fin');

  // ajout qrcode au pdf avec svg to pdf
  SVGtoPDF(doc, QRCode.toString('I am a pony!', {
    type: 'svg',
    version: 5, //  Version du QR Code calculé
    errorCorrectionLevel: 'H', //  Niveau de correction d'erreur
  }, (err, url) => url), 400, 200, { width: 150, height: 150 });

  doc.on('finish', () => { console.log('fini'); });

  // HTTP response

  doc.pipe(res);
  doc.end();
};

///
// enregistrement devis colis en base de donnees
///

exports.enregistrementsDataBase = (req, res, next) => {
  const nouveauDevisColis = new ShemaDeviscolis({
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

///
// calculateur de distance pour livraison
///

exports.calculateurDistancePrix = (req, res) => {
  // recuperation coordonne gpe ville
  const coordonneeGpsDepart = dataVille.filter(
    (e) => e.nom_ville === req.body.ville.depart,
  )[0].coordonnee;
  const coordonneeGpsArrive = dataVille.filter(
    (e) => e.nom_ville === req.body.ville.arrive,
  )[0].coordonnee;

  // recuperation categorie

  const categorie = dataCategory[req.body.categorie];
  axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordonneeGpsDepart.lat},${coordonneeGpsDepart.long};${coordonneeGpsArrive.lat},${coordonneeGpsArrive.long}?access_token=${process.env.KEY_BOX_MAP}`)
    .then((e) => {
      const estimationPrix = (e.data.routes[0].distance * 0.20) / 1000 + categorie;
      const distanceLivraison = e.data.routes[0].distance / 1000;
      res.status(200).json({
        prix: estimationPrix,
        distance_livraison: distanceLivraison,
      });
    })
    .catch();
};
