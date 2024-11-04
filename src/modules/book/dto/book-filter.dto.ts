import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookFilterDto {
  @ApiProperty({ description: 'Kitap yazarını filtrelemek için kullanılır', required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ description: 'Kitap türünü filtrelemek için kullanılır', required: false })
  @IsOptional()
  @IsString()
  genre?: string;
}
