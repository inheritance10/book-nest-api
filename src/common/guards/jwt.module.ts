import { Global, Module } from '@nestjs/common';
import { JwtModule as BaseJwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Global()
@Module({
  providers: [JwtTokenService],
  imports: [
    BaseJwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
  ],
  exports: [JwtTokenService],
})
export class JwtModule {}
