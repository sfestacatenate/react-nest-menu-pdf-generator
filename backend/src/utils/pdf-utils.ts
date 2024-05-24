import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

function addCategory(
  doc: PDFKit.PDFDocument,
  category: string,
  items: { name: string; price: string }[],
): void {
  doc.fontSize(20).text(category, {
    underline: true,
  });
  doc.moveDown(0.5);

  items.forEach((item) => {
    doc.fontSize(14).text(`${item.name} - ${item.price}`);
    doc.moveDown(0.5);
  });

  doc.moveDown(1.5);
}

export function generatePdf(): string {
  const doc = new PDFDocument();
  const pdfDir = path.join(__dirname, '..', '..', 'pdf');
  const fontsDir = path.join(__dirname, '..', '..', 'assets', 'fonts');

  // Assicurati che la cartella pdf esista
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }

  const filePath = path.join(pdfDir, 'restaurant-menu.pdf');

  // Crea uno stream di scrittura per il file
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Registra e utilizza il font personalizzato
  const greatVibesPath = path.join(fontsDir, 'GreatVibes-Regular.ttf');
  doc.registerFont('GreatVibes', greatVibesPath);

  // Titolo del menu
  doc.font('GreatVibes').fontSize(30).text('Ristorante Italiano', {
    align: 'center',
  });
  doc.moveDown(2);

  // Categorie e prodotti
  addCategory(doc, 'Antipasti', [
    { name: 'Bruschetta', price: '€5.00' },
    { name: 'Carpaccio', price: '€8.00' },
  ]);

  addCategory(doc, 'Primi Piatti', [
    { name: 'Spaghetti Carbonara', price: '€12.00' },
    { name: 'Lasagna', price: '€10.00' },
  ]);

  addCategory(doc, 'Secondi Piatti', [
    { name: 'Bistecca alla Fiorentina', price: '€20.00' },
    { name: 'Pollo alla Cacciatora', price: '€15.00' },
  ]);

  addCategory(doc, 'Dolci', [
    { name: 'Tiramisù', price: '€6.00' },
    { name: 'Panna Cotta', price: '€5.00' },
  ]);

  addCategory(doc, 'Vini', [
    { name: 'Chianti', price: '€25.00' },
    { name: 'Barolo', price: '€30.00' },
  ]);

  // Chiudi il documento PDF
  doc.end();

  return filePath;
}
