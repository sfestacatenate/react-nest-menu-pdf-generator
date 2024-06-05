import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
  async createMenu(
    @Body() menu: Menu,
  ): Promise<{ message: string; menu: Menu }> {
    try {
      const createdMenu = await this.menuService.createMenu(menu);
      return {
        message: 'Menu created successfully',
        menu: createdMenu,
      };
    } catch (error) {
      throw new HttpException(
        'Error creating menu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
