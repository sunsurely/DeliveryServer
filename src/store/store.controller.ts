import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from '@nestjs/passport';
import { StoreDTO } from './dto/store.dto';
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
}
