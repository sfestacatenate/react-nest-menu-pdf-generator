import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { Menu } from 'src/models/Models';

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

export function createMenu(menu: Menu, hashPdfName: string): string {
  return createPdf(menu, hashPdfName);
}

export function updateMenu(menu: Menu, menuFromDb: Menu): void {
  const oldPdfExists = fs.existsSync(
    path.join(__dirname, '..', '..', 'pdf', menuFromDb.pdfName),
  );
  if (oldPdfExists) {
    fs.unlinkSync(path.join(__dirname, '..', '..', 'pdf', menuFromDb.pdfName));
  }

  createPdf(menu, menuFromDb.pdfName);
}

export function createHashPdfName(): string {
  return Math.random().toString(36).substring(7) + '.pdf';
}

function createPdf(menu: Menu, hashPdfName: string): string {
  const doc = new PDFDocument();
  const pdfDir = path.join(__dirname, '..', '..', 'pdf');
  const fontsDir = path.join(__dirname, '..', '..', 'assets', 'fonts');

  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }

  const filePath = path.join(pdfDir, hashPdfName);

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  const greatVibesPath = path.join(fontsDir, 'GreatVibes-Regular.ttf');
  doc.registerFont('GreatVibes', greatVibesPath);

  doc.font('GreatVibes').fontSize(30).text(menu.name, {
    align: 'center',
  });
  doc.moveDown(2);

  menu.categories.forEach((category) => {
    addCategory(
      doc,
      category.name,
      category.dishes.map((dish) => ({
        name: dish.name,
        price: `€${dish.price.toFixed(2)}`,
      })),
    );
  });

  doc.end();
  return filePath;
}

export function removePdfFromDisk(pdfName: string): void {
  const pdfPath = path.join(__dirname, '..', '..', 'pdf', pdfName);
  if (fs.existsSync(pdfPath)) {
    fs.unlinkSync(pdfPath);
  }
}
