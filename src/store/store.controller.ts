import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from '@nestjs/passport';
import { MenuDTO, StoreDTO } from './dto/store.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/regist')
  @UseInterceptors(FileInterceptor('image'))
  async registStore(
    @Body() storeDto: StoreDTO,
    @Req() req: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    await this.storeService.registStore(storeDto, req.user.id, files);
    return '상점등록 성공';
  }

  @Get('/:categoryId')
  async getStoreByCategory(
    @Param(
      'categoryId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    categoryId: number,
  ) {
    return await this.storeService.getStoreByCategory(categoryId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:storeId/menu')
  @UseInterceptors(FileInterceptor('image'))
  async registMenu(
    @Param(
      'storeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    storeId: number,
    @Body() menuDto: MenuDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.storeService.registMenu(storeId, menuDto, file);
    return '메뉴등록 성공';
  }
}
