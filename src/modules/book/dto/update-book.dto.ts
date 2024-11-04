import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsOptional, IsString, IsInt, IsNumber } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ description: 'Kitap başlığı', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Kitap yazarı', required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ description: 'Yayın yılı', required: false })
  @IsOptional()
  @IsInt()
  publishedYear?: number;

  @ApiProperty({ description: 'Kitap türü', required: false })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({ description: 'Kitap puanı', required: false })
  @IsOptional()
  @IsNumber()
  point?: number;
}
