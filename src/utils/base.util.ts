import path from 'path';
import { AppConstant } from './constant';

export const getContentType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {};

  // Build mimeTypes map from AppConstant.ALLOWED_MIME_TYPES
  AppConstant.ALLOWED_MIME_TYPES.forEach((mimeType) => {
    switch (mimeType) {
      case 'image/jpeg':
        mimeTypes['.jpg'] = mimeType;
        mimeTypes['.jpeg'] = mimeType;
        break;
      case 'image/png':
        mimeTypes['.png'] = mimeType;
        break;
      case 'image/webp':
        mimeTypes['.webp'] = mimeType;
        break;
      case 'image/gif':
        mimeTypes['.gif'] = mimeType;
        break;
      // video will be converted to mp4
      case 'video/mp4':
        mimeTypes['.mp4'] = mimeType;
        mimeTypes['.mov'] = mimeType;
        break;
    }
  });

  // if not found, return application/octet-stream as default
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  return mimeType;
};
