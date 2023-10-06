import { Injectable } from '@nestjs/common';

import { Store } from './entity/store.entity';
import { DataSource, Repository } from 'typeorm';
import { Menu } from './entity/menu.entity';
import { StoreDTO } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(private dataSource: DataSource) {}

  async registStore(
    storeDto: StoreDTO,
    id: number,
    files: Express.Multer.File[],
  ) {
    const menus = storeDto.menus;
    let images = [];

    if (!files || files.length <= 0) {
      for (let i = 0; i <= menus.length; i++) {
        images.push('no image');
      }
    } else {
      for (const file of files) {
        images.push(file ? file.filename : 'no image');
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newStore = new Store();
      newStore.name = storeDto.name;
      newStore.address = storeDto.address;
      newStore.imgUrl = images[0];
      newStore.call = storeDto.category;
      newStore.userId = id;

      const savedStore = await queryRunner.manager.save(newStore);

      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const newMenu = new Menu();
        newMenu.menu = menu.menu;
        newMenu.imgUrl = images[i + 1];
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
