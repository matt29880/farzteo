import {ArticleDescription} from '../article/articleDescription';
import {ArticleListItem} from '../article/articleListItem';

export class ArticleUnorderedList extends ArticleDescription {
  type = 'ul';
  items: ArticleListItem[];
}
