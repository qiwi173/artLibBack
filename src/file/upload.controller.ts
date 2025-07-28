import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { multerOptions } from './cloudinary.provider';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(200)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions)) 
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.handleUploadedFile(file);
  }
}
