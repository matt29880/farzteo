import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ArticlesService } from '../articles/articles.service';
import { CountriesService } from '../countries/countries.service';
import { Article } from './article';
import { ListCountry } from '../countries/listcountry';
import { ArticleDescription } from './articleDescription';
import { ArticleParagraph } from './articleParagraph';
import { ArticleTitle } from './articleTitle';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { ArticleAlbum } from './articleAlbum';
import { AlbumsService } from '../albums/albums.service';
import { ListAlbum } from '../albums/listalbum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Media } from '../media/media';
import { MediaType } from '../media/mediatype';
import { MediaService } from '../media/media.service';
import { ArticlePhoto } from './articlePhoto';
import {environment} from '../../../../environments/environment';
import { ArticleUnorderedList } from './articleUnorderedList';
import { ArticleListItem } from './articleListItem';

@Component({
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent implements OnInit {
  modalRef: BsModalRef;
  private environment = environment;
  constructor(public articlesService: ArticlesService, 
    public countriesService: CountriesService, 
    public albumsService: AlbumsService, 
    private route: ActivatedRoute, 
    private router: Router,
    public mediaService: MediaService,
    private modalService: BsModalService) {
  }
  dataAvailable = false;
  articleId: number;
  article: Article;
  descriptionItems: ArticleDescription[];
  countries: ListCountry[];
  @ViewChild('f', {static: true}) form: NgForm;
  albums: ListAlbum[] = [];
  modalType: string;
  dragIndex: number;
  hrClass: string;

  ngOnInit() {
    this.initializeEmptyArticle();
    this.getCountries().subscribe(countries => {
      this.countries = countries;
      this.getAlbums().subscribe(albums => {
        this.albums = albums;
      });
      if (this.route.snapshot.paramMap.get('id') == 'new') {
        return;
      }
      // The JavaScript (+) operator converts the string to a number
      this.articleId = +this.route.snapshot.paramMap.get('id');
      if (this.articleId != null) {
        this.getArticle().subscribe(article => { this.article = article; this.descriptionItems = JSON.parse(this.article.description); this.dataAvailable = true; });
      }
    });
  }

  initializeEmptyArticle() {
    this.article = new Article();
    this.article.online = false;
    this.descriptionItems = [];
  }

  getCountries(): Observable<ListCountry[]> {
    return this.countriesService.getCountries();
  }
  getArticle(): Observable<Article> {
    return this.articlesService.getArticle(this.articleId);
  }
  getAlbums() : Observable<ListAlbum[]> {
    return this.albumsService.getAlbums();
  }

  deleteArticle(): void {
    if (confirm("Are you sure to want to remove the article '" + this.article.name + "' ?")) {
      this.articlesService.deleteArticle(this.articleId).subscribe(response => console.log("Article deleted !"));
      this.router.navigate(['articles'], {relativeTo: this.route.parent});
    }
  }

  onSubmit() {
    console.log(this.form);
    this.article.description = JSON.stringify(this.descriptionItems);
    if (this.article.id == null) {
      this.articlesService.insertArticle(this.article).subscribe(article => { this.article = article; console.log("Article inserted !");this.router.navigate(['articles'], {relativeTo: this.route.parent}); });
    } else {
      this.articlesService.updateArticle(this.articleId, this.article).subscribe(response => {console.log("Article updated !");this.router.navigate(['articles'], {relativeTo: this.route.parent});});
    }
  } 	

  addDescriptionItem(type: string, template: TemplateRef<any>) {
    console.log("Add " + type);
    let descriptionItem: ArticleDescription;
    if (type == 'title') {
      descriptionItem = new ArticleTitle();
      console.log(descriptionItem);
      descriptionItem.edit = true;
      this.descriptionItems.push(descriptionItem);
    } else if (type == 'paragraph') {
      descriptionItem = new ArticleParagraph();
      console.log(descriptionItem);
      descriptionItem.edit = true;
      this.descriptionItems.push(descriptionItem);
    } else if (type == 'ul') {
      let articleUl = new ArticleUnorderedList();
      articleUl.items = [new ArticleListItem()];
      descriptionItem = articleUl;
      console.log(descriptionItem);
      descriptionItem.edit = true;
      this.descriptionItems.push(descriptionItem);
    } else if (type == 'album') {
      this.albumsService.getAlbums().subscribe(albums => {
        this.albums = albums;
        descriptionItem = new ArticleAlbum();
        console.log(descriptionItem);
        descriptionItem.edit = true;
        this.descriptionItems.push(descriptionItem);
      });
    } else if (type == 'photo') {
      this.openModal(template, 'photo');
    }
  }

  addUnorderedListItem(index: number) {
    console.log("addUnorderedListItem, index = " + index);
    let articleUl = <ArticleUnorderedList> this.descriptionItems[index];
    articleUl.items.push(new ArticleListItem());
    console.log(articleUl);
  }

  setPhoto(filePath : string) : void {
    this.modalRef.hide();
    let media = new Media();
    media.name = "";
    let mediaTypeId = MediaType[MediaType.PHOTO];
    media.type = mediaTypeId;
    media.online = true;
    media.url = filePath;
    media.albumId = null;
    this.mediaService.insertMedia(media).subscribe(media => {
      console.log("MEDIA ADDED ! " + media + " - type : " + this.modalType);

      if (this.modalType == 'photo') {
        let articlePhoto = new ArticlePhoto();
        articlePhoto.id = media.id;
        articlePhoto.url = media.url;
        console.log(articlePhoto);
        this.descriptionItems.push(articlePhoto);
      } else if (this.modalType == 'thumbnail') {
        this.article.thumbnailId = media.id;
        this.article.thumbnailUrl = media.url;
      }

    });
  }

  removeDescriptionItem(index: number) {
    this.descriptionItems.splice(index, 1);
  }
  
  openModalThumbnail(template: TemplateRef<any>) {
    this.openModal(template, 'thumbnail');
  }
  
  openModal(template: TemplateRef<any>, modalType: string) {
    this.modalType = modalType;
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }
  editDescription(index: number) {
    this.descriptionItems[index].edit = !this.descriptionItems[index].edit;
  }

  moveDescriptionUp(index: number) {
    if (index <= 0){
      return;
    }
    const indexUp = index - 1;
    const item = this.descriptionItems[index];
    const itemUp = this.descriptionItems[indexUp];
    this.descriptionItems[indexUp] = item;
    this.descriptionItems[index] = itemUp;
  }
  moveDescriptionDown(index: number) {
    const indexDown = index + 1;
    if (indexDown >= this.descriptionItems.length){
      return;
    }
    const item = this.descriptionItems[index];
    const itemDown = this.descriptionItems[indexDown];
    this.descriptionItems[indexDown] = item;
    this.descriptionItems[index] = itemDown;
  }
  moveListItemUp(descriptionIndex: number, listItemIndex: number) {
    if (listItemIndex <= 0){
      return;
    }
    const indexUp = listItemIndex - 1;
    const items = (<ArticleUnorderedList>this.descriptionItems[descriptionIndex]).items;
    const item = items[listItemIndex];
    const itemUp = items[indexUp];
    items[indexUp] = item;
    items[listItemIndex] = itemUp;
  }
  moveListItemDown(descriptionIndex: number, listItemIndex: number) {
    const indexDown = listItemIndex + 1;
    const items = (<ArticleUnorderedList>this.descriptionItems[descriptionIndex]).items;
    if (descriptionIndex >= items.length){
      return;
    }
    const item = items[listItemIndex];
    const itemDown = items[indexDown];
    items[indexDown] = item;
    items[listItemIndex] = itemDown;
  }
  removeListItem(descriptionIndex: number, listItemIndex: number) {
    const items = (<ArticleUnorderedList>this.descriptionItems[descriptionIndex]).items;
    items.splice(listItemIndex, 1);
  }

  dragStart(event, index) {
    console.log("Start drag element " + index, event);
    this.dragIndex = index;
    this.hrClass = "drag";
  }

  hrDrop(event, index) {
    const from = this.dragIndex;
    const to = index;
    console.log("from : " + from + " - to : " + to);
    const item = this.descriptionItems[from];
    this.descriptionItems.splice(from, 1);
    this.descriptionItems.splice(to, 0, item);
    this.hrClass = "";
  }

  hrDragOver(event, index) {
    console.log(event.target);
    event.target.className = "dragover";
    event.preventDefault();
  }

  hrDragLeave(event, index) {
    event.target.className = "drag";
  }
}
