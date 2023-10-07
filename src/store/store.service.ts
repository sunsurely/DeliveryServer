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

  async getStoresByCategory(categoryId: number): Promise<Store[]> {
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

  async getStoreByStoreId(storeId: number) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('가게조회 실패');
    }

    const menus = await this.menuRepository.find({ where: { storeId } });

    if (!menus || menus.length <= 0) {
      throw new NotFoundException('메뉴조회 실패');
    }

    return { store, menus };
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

  async getMenusByCategory(storeId: number) {
    const menus = await this.menuRepository.find({ where: { storeId } });

    if (!menus || menus.length <= 0) {
      throw new NotFoundException('등록된 메뉴가 없습니다.');
    }

    return menus;
  }

  async getMenu(menuId: number) {
    const menu = await this.menuRepository.findOne({ where: { id: menuId } });

    if (!menu) {
      throw new NotFoundException('등록된 메뉴가 없습니다.');
    }

    return menu;
  }
}
