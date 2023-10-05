import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMenu } from './entity/orderMenu.entity';
import { Order } from './entity/order.entity';
import { Menu } from 'src/store/entity/menu.entity';
import { Cart } from './entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderMenu, Order, Menu, Cart])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
