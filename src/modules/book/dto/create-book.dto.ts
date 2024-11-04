import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Kitap başlığı' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Kitap yazarı' })
  @IsString()
  author: string;

  @ApiProperty({ description: 'Yayın yılı' })
  @IsInt()
  publishedYear: number;

  @ApiProperty({ description: 'Kitap türü' })
  @IsString()
  genre: string;

  @ApiProperty({ description: 'Kitap puanı', required: false })
  @IsOptional()
  @IsNumber()
  point?: number;
}
