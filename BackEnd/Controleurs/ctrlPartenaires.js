const PDFDocument = require('pdfkit');
const fs = require('fs');

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
