import { Injectable } from '@nestjs/common';
import fs from 'fs-extra';

@Injectable()
export default class BlobManager {
  private basePath: string = process.env.BASE_BLOB_PATH;

  async write(path: string, file: Buffer): Promise<void> {
    try {
      await fs.ensureDir(this.basePath);
      await fs.writeFile(`${this.basePath}/${path}`, file);
    } catch (err) {
      throw 'Error while writing file';
    }
  }

  async read(path: string): Promise<Buffer> {
    try {
      return await fs.readFile(`${this.basePath}/${path}`);
    } catch (err) {
      throw 'Error while reading file';
    }
  }
}
