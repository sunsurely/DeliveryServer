import { Menu } from 'src/store/entity/menu.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  orderId: number;

  @Column({
    type: 'int',
  })
  menuId: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Menu, (menu) => menu.orderMenus)
  menu: Menu;
}
