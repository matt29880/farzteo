import {ArticleDescription} from '../article/articleDescription';
import { PhotoItem } from './photoItem';

export class ArticlePhotoList extends ArticleDescription {
  type = 'photo_list';
  photos : PhotoItem[];
}
