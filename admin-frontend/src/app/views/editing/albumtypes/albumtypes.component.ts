import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListAlbumType} from './listalbumtype';
import {AlbumTypesService} from './albumtypes.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: 'albumtypes.component.html'
})
export class AlbumTypesComponent implements OnInit, OnDestroy {
  constructor(public albumTypesService: AlbumTypesService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.getAlbumTypes();
  }

  listalbumtype: ListAlbumType[];

  getAlbumTypes(): void {
    this.albumTypesService.getAlbumTypes().subscribe(listalbumtype => { this.listalbumtype = listalbumtype; console.log(this.listalbumtype);});
  }
  ngOnDestroy(): void {
    this.listalbumtype = null;
  }

}
