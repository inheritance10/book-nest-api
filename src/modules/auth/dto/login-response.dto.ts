import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class LoginResponseDto {
  @ApiProperty()
  identity: User

  @ApiProperty()
  token: {
    accessToken: {
      jwt: string;
      expiresIn: number | string;
    };
  };
}
