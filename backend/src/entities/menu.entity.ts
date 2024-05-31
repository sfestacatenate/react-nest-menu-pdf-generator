import { MenuCategory } from 'src/models/Models';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menus')
export class RestaurantMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  categories: MenuCategory[];

  @Column('varchar', { length: 255, default: '', name: 'pdf_hash' })
  pdfName: string;
}
