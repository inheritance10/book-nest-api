import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';


@Controller('swagger')
export class SwaggerController {
  @Get()
  getSwagger(@Res() res: Response) {
    const filePath = path.join(process.cwd(), 'public', 'swagger.html');
    res.sendFile(filePath);
  }
}
