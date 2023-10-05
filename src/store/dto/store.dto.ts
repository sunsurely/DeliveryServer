import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class Menu {
  @IsNotEmpty()
  @IsString()
  readonly menu: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly imgUrl: string;
}

export class StoreDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly imgUrl: string;

  @IsNotEmpty()
  @IsString()
  readonly call: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsArray()
  readonly menus: Menu[];
}
