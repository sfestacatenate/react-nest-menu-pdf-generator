import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Param,
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

  @Get('getmenu/:id')
  getMenu(@Param('id') id: number): Promise<Menu> {
    return this.menuService.findOne(id);
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
  async updateMenu(
    @Body() menu: Menu,
  ): Promise<{ message: string; menu: Menu }> {
    try {
      const updatedMenu = await this.menuService.updateMenu(menu);
      return {
        message: 'Menu updated successfully',
        menu: updatedMenu,
      };
    } catch (error) {
      throw new HttpException(
        'Error updating menu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('deletemenu/:id')
  async deleteMenu(@Param('id') id: number): Promise<number> {
    await this.menuService.remove(id);
    return id;
  }
}
