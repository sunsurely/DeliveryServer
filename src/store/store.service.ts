import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from './entity/store.entity';
import { DataSource, Repository } from 'typeorm';
import { Menu } from './entity/menu.entity';
import { MenuDTO, StoreDTO } from './dto/store.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoreService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

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
      newStore.call = storeDto.call;
      newStore.userId = id;
      newStore.categoryId = storeDto.categoryId;

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
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getStoreByCategory(categoryId: number) {
    let stores: Store[] = [];
    if (categoryId === 0) {
      stores = await this.storeRepository.find();

      if (!stores || stores.length <= 0) {
        throw new NotFoundException('등록된 가게가 없습니다.');
      }
    } else {
      stores = await this.storeRepository.find({ where: { categoryId } });
    }

    return stores;
  }

  async registMenu(
    storeId: number,
    menuDto: MenuDTO,
    file: Express.Multer.File,
  ) {
    const image = file ? file.filename : 'no image';

    const newMenu = new Menu();
    newMenu.imgUrl = image;
    newMenu.description = menuDto.description;
    newMenu.price = menuDto.price;
    newMenu.menu = menuDto.menu;
    newMenu.storeId = storeId;

    await this.menuRepository.save(newMenu);
    return;
  }
}
