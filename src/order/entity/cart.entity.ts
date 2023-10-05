import { Menu } from 'src/store/entity/menu.entity';
import { Store } from 'src/store/entity/store.entity';
import { User } from 'src/user/user.entity';
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
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  storeId: number;

  @Column({ type: 'int' })
  menuId: number;

  @Column({ type: 'int' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Menu, (menu) => menu.carts)
  menu: Menu;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Store, (store) => store.carts)
  store: Store;
}
