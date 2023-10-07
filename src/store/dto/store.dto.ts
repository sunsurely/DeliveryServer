import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class MenuDTO {
  @IsNotEmpty()
  @IsString()
  readonly menu: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
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
  readonly call: string;

  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  @IsNotEmpty()
  @IsArray()
  readonly menus: MenuDTO[];
}
