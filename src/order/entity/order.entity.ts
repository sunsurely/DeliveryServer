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
import { Status } from '../orderInfo';
import { User } from 'src/user/user.entity';
import { Store } from 'src/store/entity/store.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  menu: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  totalPrice: number;

  @Column({ type: 'enum', enum: Status })
  request: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Store, (store) => store.orders)
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
