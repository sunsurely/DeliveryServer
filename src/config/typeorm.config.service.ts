import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.entity';
import { Store } from 'src/store/entity/store.entity';
import { Order } from 'src/order/entity/order.entity';
import { OrderMenu } from 'src/order/entity/orderMenu.entity';
import { Menu } from 'src/store/entity/menu.entity';
import { Cart } from 'src/order/entity/cart.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [User, Store, Order, OrderMenu, Menu, Cart],
      synchronize: true,
    };
  }
}
