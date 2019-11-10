import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListArticle} from './listarticle';
import {ArticlesService} from './articles.service';
import {CountriesService} from '../countries/countries.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: 'articles.component.html'
})
export class ArticlesComponent implements OnInit, OnDestroy {
  constructor(public articlesService: ArticlesService, public countriesService: CountriesService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.getArticles();
  }

  listarticle: ListArticle[];

  getArticles(): void {
    this.articlesService.getArticles().subscribe(listarticle => this.listarticle = listarticle);
  }
  ngOnDestroy(): void {
    this.listarticle = null;
  }

}
