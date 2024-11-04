import { IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class BookOrderDto {
  @ApiProperty({ description: 'Kitapları puana göre sıralamak için kullanılır', required: false, enum: OrderDirection })
  @IsOptional()
  @IsEnum(OrderDirection)
  orderBy?: OrderDirection;
}
