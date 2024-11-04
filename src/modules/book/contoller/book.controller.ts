import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateBookDto } from '../dto/update-book.dto';
import { CreateBookDto } from '../dto/create-book.dto';
import { BookService } from '../service/book.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { PaginationDto } from '../dto/pagination.dto';
import { BookFilterDto } from '../dto/book-filter.dto';
import { BookOrderDto } from '../dto/book-order.dto';

@Controller('book')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Yeni bir kitap ekle' })
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto, @CurrentUser() user: any) {
    return this.bookService.create(createBookDto, user.id);
  }

  @ApiOperation({ summary: 'Tüm kitapları filtreleme, sıralama ve sayfalama ile listele' })
  @Get()
  async findMany(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: BookFilterDto,
    @Query() orderDto: BookOrderDto,
  ) {
    return this.bookService.findMany(paginationDto, filterDto, orderDto);
  }

  @ApiOperation({ summary: 'Kitap detaylarını görüntüle' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Bir kitabı güncelle' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(Number(id), updateBookDto);
  }

  @ApiOperation({ summary: 'Bir kitabı sil' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(Number(id));
  }
}
