import { Test, TestingModule } from '@nestjs/testing';

import { BookService } from '../service/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { BookFilterDto } from '../dto/book-filter.dto';
import { BookOrderDto, OrderDirection } from '../dto/book-order.dto';
import { BookController } from '../contoller/book.controller';
import { JwtService } from '@nestjs/jwt';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    create: jest.fn(),
    findMany: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
        JwtService
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Author',
        publishedYear: 2021,
        genre: 'Fiction',
      };
      const user = { id: 1 };
      mockBookService.create.mockResolvedValue({ id: 1, ...createBookDto });

      const result = await controller.createBook(createBookDto, user);
      expect(result).toEqual({ id: 1, ...createBookDto });
      expect(mockBookService.create).toHaveBeenCalledWith(createBookDto, user.id);
    });
  });

  describe('findMany', () => {
    it('should return a list of books', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };
      const filterDto: BookFilterDto = { genre: 'Fiction' };
      const orderDto: BookOrderDto = { orderBy: OrderDirection.ASC };
      const books = [{ id: 1, title: 'Test Book' }];

      mockBookService.findMany.mockResolvedValue(books);

      const result = await controller.findMany(paginationDto, filterDto, orderDto);
      expect(result).toEqual(books);
      expect(mockBookService.findMany).toHaveBeenCalledWith(paginationDto, filterDto, orderDto);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const book = { id: 1, title: 'Test Book' };
      mockBookService.findOne.mockResolvedValue(book);

      const result = await controller.findOne('1');
      expect(result).toEqual(book);
      expect(mockBookService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
      const updatedBook = { id: 1, ...updateBookDto };

      mockBookService.update.mockResolvedValue(updatedBook);

      const result = await controller.update('1', updateBookDto);
      expect(result).toEqual(updatedBook);
      expect(mockBookService.update).toHaveBeenCalledWith(1, updateBookDto);
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      mockBookService.delete.mockResolvedValue({ id: 1 });

      const result = await controller.delete('1');
      expect(result).toEqual({ id: 1 });
      expect(mockBookService.delete).toHaveBeenCalledWith(1);
    });
  });
});
