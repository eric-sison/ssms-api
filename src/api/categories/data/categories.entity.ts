import { BaseEntity } from 'src/utils/entity';
import { Column, Entity } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;
}
