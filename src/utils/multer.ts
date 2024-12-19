import multer from 'multer';
import path from 'path';
import { AppConstant } from './constant';
import { ValidationError } from '../errors/custom-errors';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(__dirname, '..', '..', 'uploads');
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const uniqueName = `${timestamp}-${random}${extension}`;
    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  const isAllowedType = AppConstant.ALLOWED_MIME_TYPES.includes(
    file.mimetype as (typeof AppConstant.ALLOWED_MIME_TYPES)[number],
  );

  if (isAllowedType) {
    cb(null, true);
  } else {
    cb(new ValidationError('Invalid file type'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: AppConstant.MAX_FILE_SIZE },
  fileFilter,
});
