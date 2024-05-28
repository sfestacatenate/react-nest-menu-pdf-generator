import { Injectable } from '@nestjs/common';
import { Menu } from 'src/models/Models';
import { InjectRepository } from '@nestjs/typeorm';
import * as pdfUtils from 'src/utils/pdf-utils';
import { RestaurantMenu } from '../entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(RestaurantMenu)
    private menuRepository: Repository<RestaurantMenu>,
  ) {}

  generatePdf(): string {
    return pdfUtils.generatePdf();
  }

  createMenu(menu: Menu): void {
    pdfUtils.createMenu(menu);
    this.menuRepository.save(menu);
  }

  findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  findOne(id: number): Promise<Menu | null> {
    return this.menuRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
