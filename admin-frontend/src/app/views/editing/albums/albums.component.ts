import {Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import {ExplorerComponent} from '../explorer/explorer.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {ListAlbum} from './listalbum';
import {AlbumsService} from './albums.service';
import {CountriesService} from '../countries/countries.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'albums.component.html'
})
export class AlbumsComponent implements OnInit, OnDestroy {
  constructor(public albumsService: AlbumsService, public countriesService: CountriesService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.getAlbums();
  }

  albums: ListAlbum[];

  getAlbums(): void {
    this.albumsService.getAlbums().subscribe(albums => this.albums = albums);
  }
  ngOnDestroy(): void {
    this.albums = null;
  }

}
