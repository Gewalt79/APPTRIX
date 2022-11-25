import { v4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';

class FilesService {
  static async apllyWatermark(file) {
    try {
      const [image, logo] = await Promise.all([
        Jimp.read(file.path),
        Jimp.read('uploads/logo.png'),
      ]);

      logo.resize(image.bitmap.width / 10, Jimp.AUTO);

      const xMargin = (image.bitmap.width * 5) / 100;
      const yMargin = (image.bitmap.width * 5) / 100;

      const X = image.bitmap.width - logo.bitmap.width - xMargin;
      const Y = image.bitmap.height - logo.bitmap.height - yMargin;

      let img = await image.composite(logo, X, Y, {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: 1,
        opacityDest: 0.5,
      });

      img.write(file.path);
      return true;
    } catch (e) {
      return 'Error while handling image';
    }
  }
}

export default FilesService;
