import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDTO } from 'src/auth/dto/authDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() authDto: AuthDTO.Signup) {
    const { email, nickname } = authDto;

    const existEmail = await this.userService.findByEmail(email);
    if (existEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const existNickname = await this.userService.findByNickname(nickname);
    if (existNickname) {
      throw new ConflictException('이미 사용중인 닉네임 입니다.');
    }

    await this.userService.create(authDto);

    return '회원가입 성공';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getUsersProfile(@Req() req: any) {
    return req.user;
  }
}
