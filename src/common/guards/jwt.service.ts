import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { add } from 'date-fns';
import { GenerateTokenDto } from '../dto/generate-token.dto';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}
  async generateAccessToken(payload: GenerateTokenDto): Promise<any> {
    const expiresIn = add(new Date(), {
      [process.env.JWT_EXPIRES_IN_UNIT]: parseInt(process.env.JWT_EXPIRES_IN),
    });

    const jwt = await this.jwtService.signAsync(payload, {
      expiresIn:
        process.env.JWT_EXPIRES_IN + process.env.JWT_EXPIRES_IN_UNIT[0],
    });

    return {
      jwt,
      expiresIn: expiresIn,
    };
  }
  async generateRefreshToken(payload: GenerateTokenDto): Promise<any> {
    const expiresIn = add(new Date(), {
      [process.env.JWT_REFRESH_EXPIRES_IN_UNIT]: parseInt(
        process.env.JWT_REFRESH_EXPIRES_IN,
      ),
    });

    const jwt = await this.jwtService.signAsync(payload, {
      expiresIn:
        process.env.JWT_REFRESH_EXPIRES_IN +
        process.env.JWT_REFRESH_EXPIRES_IN_UNIT[0],
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });

    return {
      jwt,
      expiresIn: expiresIn,
    };
  }
}
