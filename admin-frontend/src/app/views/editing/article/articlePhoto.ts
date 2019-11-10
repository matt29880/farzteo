import {ArticleDescription} from '../article/articleDescription';

export class ArticlePhoto extends ArticleDescription {
  type = 'photo';
  id: number;
  url: string;
}
