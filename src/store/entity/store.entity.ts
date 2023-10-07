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
import { Menu } from './menu.entity';
import { Order } from 'src/order/entity/order.entity';
import { Cart } from 'src/order/entity/cart.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  imgUrl: string;

  @Column({ type: 'varchar' })
  call: string;

  @Column({ type: 'int' })
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Menu, (menu) => menu.store)
  menus: Menu[];

  @ManyToOne(() => Order, (order) => order.store)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.store)
  carts: Cart[];
}
