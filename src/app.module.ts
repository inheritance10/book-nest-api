import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './modules/auth/service/auth.service';
import { AuthController } from './modules/auth/controller/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    ConfigModule, UserModule, BookModule, PrismaModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {
}
