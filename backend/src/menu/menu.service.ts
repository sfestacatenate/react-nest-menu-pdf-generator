import { Injectable } from '@nestjs/common';
import { Menu } from 'src/models/Models';
import * as pdfUtils from 'src/utils/pdf-utils';

@Injectable()
export class MenuService {
  generatePdf(): string {
    return pdfUtils.generatePdf();
  }
  createMenu(menu: Menu): void {
    console.log(menu);
  }
}
