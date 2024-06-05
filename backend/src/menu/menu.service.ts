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

  async createMenu(menu: Menu): Promise<Menu> {
    const pdfName = pdfUtils.createHashPdfName();
    pdfUtils.createMenu(menu, pdfName);
    menu.pdfName = pdfName;
    await this.menuRepository.save(menu);
    return menu;
  }

  async updateMenu(menu: Menu): Promise<void> {
    const menuFromDb = await this.menuRepository.findOne({
      where: { id: menu.id },
    });
    pdfUtils.updateMenu(menu, menuFromDb);
    await this.menuRepository.update(menu.id, menu);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  async findOne(id: number): Promise<Menu | null> {
    return await this.menuRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
