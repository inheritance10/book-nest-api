import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from '../dto/update-book.dto';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createBookDto: CreateBookDto, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.book.create({
      data: {
        ...createBookDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findMany() {
    return this.prisma.book.findMany();
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
