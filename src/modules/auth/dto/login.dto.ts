import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'testuser',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Test123*',
  })
  @IsNotEmpty()
  @Matches(/^[\w\d!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]{6,30}$/, {
    message: 'Password must be between 6 and 30 characters long',
  })
  password: string;
}
