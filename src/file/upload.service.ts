import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async handleUploadedFile(file: Express.Multer.File) {
    return {
      url: file?.path,
      public_id: file?.filename,
    };
  }
}
