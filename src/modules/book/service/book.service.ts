import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from '../dto/update-book.dto';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PaginationDto } from '../dto/pagination.dto';
import { BookFilterDto } from '../dto/book-filter.dto';
import { BookOrderDto } from '../dto/book-order.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(data: any, userId: number) {
    return this.prisma.book.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findMany(
    paginationDto: PaginationDto,
    filterDto: BookFilterDto,
    orderDto: BookOrderDto,
  ) {
    const page = Number(paginationDto.page) || 1;
    const limit = Number(paginationDto.limit) || 10; // varsayılan olarak 10

    const { author, genre } = filterDto;
    const { orderBy } = orderDto;

    const where: Prisma.BookWhereInput = {
      ...(author ? { author: { contains: author, mode: 'insensitive' } } : {}),
      ...(genre ? { genre: { contains: genre, mode: 'insensitive' } } : {}),
    };

    const books = await this.prisma.book.findMany({
      where,
      orderBy: orderBy ? { point: orderBy } : undefined,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalBooks = await this.prisma.book.count({ where });
    const totalPages = Math.ceil(totalBooks / limit);

    return {
      data: books,
      pagination: {
        totalItems: totalBooks,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async delete(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.prisma.book.delete({
      where: { id },
    });
  }

}
