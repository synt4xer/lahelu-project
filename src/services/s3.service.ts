import path from 'path';
import { createReadStream } from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AppConstant } from '../utils/constant';

export class S3Service {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: AppConstant.S3_REGION!,
      credentials: {
        accessKeyId: AppConstant.S3_ACCESS_KEY!,
        secretAccessKey: AppConstant.S3_SECRET_KEY!,
      },
    });
  }

  async uploadFile(filePath: string, bucketName: string, mimeType: string) {
    const fileStream = createReadStream(filePath);
    const key = path.basename(filePath);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
      ContentType: mimeType,
    });

    await this.s3Client.send(command);
    return `https://${bucketName}.s3.${AppConstant.S3_REGION}.amazonaws.com/${key}`;
  }
}
