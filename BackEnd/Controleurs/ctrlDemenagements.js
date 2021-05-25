const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

exports.generateurPDFDemenagements = (req, res) => {
  console.log('midelware generation pdf ');

  const doc = new PDFDocument();
  // doc.pipe(fs.createWriteStream('./telechargement/file.pdf')); // write to PDF
  doc.text('Bon envoi Demenagements a scanner par le livreur', 100, 100);
  doc.end();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=DevisDemennagementsDenDistri.pdf');
  res.status(200);
  doc.pipe(res); // HTTP response
};

exports.envoisDevisMail = (req, res) => {
  console.log(req.body);
  console.log(process.env.COMPTE_EMAIL + process.env.PASS_MAIL);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.COMPTE_EMAIL,
      pass: process.env.PASS_MAIL,
    },

  });

  const mailOptions = {
    from: 'fabden@gmail.com',
    to: req.body.email,
    subject: `Devis Demenagement - ${req.body.contact}`,
    text: `Devis Demandé par ${req.body.contact} pour environ ${req.body.metreCarre} m²
    l'adresse depart est: ${req.body.villeDepart} et arriver est: ${req.body.VilleArriver} 
    sont numero de telephone est: ${req.body.telephone}
    sont email est : ${req.body.email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
