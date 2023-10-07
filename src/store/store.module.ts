import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entity/menu.entity';
import { Store } from './entity/store.entity';
import { OrderMenu } from 'src/order/entity/orderMenu.entity';
import { Cart } from 'src/order/entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Menu, Store, OrderMenu, Cart])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
