import sharp from 'sharp';
import Ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { AppConstant } from '../utils/constant';

export class CompressionService {
  static async getVideoMetadata(inputPath: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      Ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) return reject(err);

        const { width, height } = metadata.streams[0];
        resolve({ width: width ?? 0, height: height ?? 0 });
      });
    });
  }

  static async compressImage(
    inputPath: string,
    outputPath: string,
  ): Promise<{ outputPath: string; width: number; height: number }> {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    // maintain aspect ratio
    const aspectRatio = width / height;
    const maxWidth = AppConstant.MAX_WIDTH;
    const maxHeight = AppConstant.MAX_HEIGHT;
    let resizeOptions: {
      width: number;
      height: number;
      fit: 'inside' | 'outside' | 'cover' | 'contain';
      withoutEnlargement: boolean;
    } = {
      width: 0,
      height: 0,
      fit: 'inside',
      withoutEnlargement: true,
    };

    if (aspectRatio > 1) {
      // Landscape
      resizeOptions.width = Math.min(maxWidth, width);
      resizeOptions.height = Math.min(Math.round(maxWidth / aspectRatio), maxHeight);
    } else {
      // Portrait
      resizeOptions.width = Math.min(Math.round(maxHeight * aspectRatio), maxWidth);
      resizeOptions.height = Math.min(maxHeight, height);
    }

    await image.resize(resizeOptions).toFormat('webp', { quality: 80 }).toFile(outputPath);

    return {
      outputPath,
      width: resizeOptions.width,
      height: resizeOptions.height,
    };
  }

  static async compressVideo(
    inputPath: string,
    outputPath: string,
  ): Promise<{ outputPath: string; width: number; height: number }> {
    const { width, height } = await this.getVideoMetadata(inputPath);

    const aspectRatio = width / height;
    const maxWidth = AppConstant.MAX_WIDTH;
    const maxHeight = AppConstant.MAX_HEIGHT;
    let scaleFilter: string;
    let finalWidth: number;
    let finalHeight: number;

    if (aspectRatio > 1) {
      // Landscape
      finalWidth = Math.min(maxWidth, width);
      finalHeight = Math.round(finalWidth / aspectRatio);
      scaleFilter = `scale='min(${maxWidth},iw):-2':force_original_aspect_ratio=decrease`;
    } else {
      // Portrait
      finalHeight = Math.min(maxHeight, height);
      finalWidth = Math.round(finalHeight * aspectRatio);
      scaleFilter = `scale='-2:min(${maxHeight},ih)':force_original_aspect_ratio=decrease`;
    }

    return new Promise((resolve, reject) => {
      Ffmpeg(inputPath)
        .outputOptions([
          '-vf',
          scaleFilter,
          '-c:v libx264',
          '-preset medium',
          '-crf 23',
          '-c:a aac',
          '-b:a 128k',
          '-f mp4',
        ])
        .output(outputPath)
        .on('end', () => resolve({ outputPath, width: finalWidth, height: finalHeight }))
        .on('error', (err) => reject(err))
        .run();
    });
  }

  static async removeFile(filePath: string): Promise<void> {
    await fs.promises.unlink(filePath);
  }
}
