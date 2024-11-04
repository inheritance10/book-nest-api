import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const now = Date.now();

    // Loglama
    console.log(`İstek: ${request.method} ${request.url}`);

    return next
      .handle()
      .pipe(
        tap(() => {
          const duration = Date.now() - now;
          console.log(`Yanıt: ${response.statusCode} - Süre: ${duration}ms`);
        }),
        catchError((error) => {
          console.error('Hata:', error);
          throw new InternalServerErrorException('Bir hata oluştu');
        }),
      );
  }
}
