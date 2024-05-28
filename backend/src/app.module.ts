import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantMenu } from './entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'restaurants',
      entities: [RestaurantMenu],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([RestaurantMenu]),
  ],
  controllers: [AppController, MenuController],
  providers: [AppService, MenuService],
})
export class AppModule {}
