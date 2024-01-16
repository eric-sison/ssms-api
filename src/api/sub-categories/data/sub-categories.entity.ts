import { Category } from 'src/api/categories/data/categories.entity';
import { BaseEntity } from 'src/utils/entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('sub_categories')
export class SubCategory extends BaseEntity {
  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id_fk' })
  category: Category;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;
}
