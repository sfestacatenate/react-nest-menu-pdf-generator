import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from 'src/models/Models';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('generate')
  generatePdf(): void {
    this.menuService.generatePdf();
  }

  @Post('createmenu')
  createMenu(@Body() menu: Menu): void {
    this.menuService.createMenu(menu);
  }
}
