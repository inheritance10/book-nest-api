// src/auth/auth.service.ts
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../../prisma/prisma.service';
import { JwtTokenService } from '../../../common/guards/jwt.service';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtTokenService,
    private readonly prisma: PrismaService,
  ) {}

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: { username: data.username },
    });

    const compareHash = await bcrypt.compare(data.password, user.password);
    if (!compareHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      delete user.password;

      const tokenUserData = {
        id: user.id,
      };


      const accessToken =
        await this.jwtService.generateAccessToken(tokenUserData);

      return {
        identity: user,
        token: {
          accessToken,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async register(username: string, password: string, name: string, surname: string) {
    const isExistingUser = await this.prisma.user.findFirst({
      where: { username },
    });

    if (isExistingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: { username, password: hashedPassword, name, surname },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

}
