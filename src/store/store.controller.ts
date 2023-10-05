import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from '@nestjs/passport';
import { StoreDTO } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/regist')
  async registStore(@Body() storeDto: StoreDTO, @Req() req: any) {
    await this.storeService.registStore(storeDto, req.user.id);
    return '상점등록 성공';
  }
}
