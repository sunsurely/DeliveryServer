import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entity/store.entity';
import { DataSource, Repository } from 'typeorm';
import { Menu } from './entity/menu.entity';
import { StoreDTO } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(private dataSource: DataSource) {}

  async registStore(storeDto: StoreDTO, id: number) {
    const menus = storeDto.menus;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newStore = new Store();
      newStore.name = storeDto.name;
      newStore.address = storeDto.address;
      newStore.imgUrl = storeDto.imgUrl;
      newStore.call = storeDto.category;
      newStore.userId = id;

      const savedStore = await queryRunner.manager.save(newStore);

      for (const menu of menus) {
        const newMenu = new Menu();
        newMenu.menu = menu.menu;
        newMenu.imgUrl = menu.imgUrl;
        newMenu.description = menu.description;
        newMenu.price = menu.price;
        newMenu.storeId = savedStore.id;

        await queryRunner.manager.save(newMenu);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
