import 'express';
import { File } from 'multer';

declare module 'express' {
  export interface Request {
    file?: File;
  }
}
