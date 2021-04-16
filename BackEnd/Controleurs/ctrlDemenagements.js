const PDFDocument = require('pdfkit');

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
