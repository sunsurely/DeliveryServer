import { OrderMenu } from 'src/order/entity/orderMenu.entity';
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
  JoinColumn,
} from 'typeorm';
import { Store } from './store.entity';
import { Cart } from 'src/order/entity/cart.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  menu: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  storeId: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  imgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.menu)
  orderMenus: OrderMenu[];

  @ManyToOne(() => Store, (store) => store.menus)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @OneToMany(() => Cart, (cart) => cart.menu)
  carts: Cart[];
}
