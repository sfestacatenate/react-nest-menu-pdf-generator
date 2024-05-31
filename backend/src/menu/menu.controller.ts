import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from 'src/models/Models';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('getall')
  getAllMenus(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Post('createmenu')
  createMenu(@Body() menu: Menu): void {
    this.menuService.createMenu(menu);
  }

  @Put('updatemenu')
  updateMenu(@Body() menu: Menu): void {
    this.menuService.updateMenu(menu);
  }

  @Delete('deletemenu')
  deleteMenu(@Body() id: number): void {
    this.menuService.remove(id);
  }
}
