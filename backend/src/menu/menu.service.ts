import { Injectable } from '@nestjs/common';
import * as pdfUtils from 'src/utils/pdf-utils';

@Injectable()
export class MenuService {
  generatePdf(): string {
    return pdfUtils.generatePdf();
  }
}
