import {Component, OnInit, OnDestroy, TemplateRef, ElementRef, ViewChild} from '@angular/core';
import {ExplorerComponent} from '../explorer/explorer.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlbumsService } from '../albums/albums.service';
import { CountriesService } from '../countries/countries.service';
import { MediaService } from '../media/media.service';
import { ListCountry } from '../countries/listcountry';
import { Album } from './album';
import { Media } from '../media/media';
import { MediaType } from '../media/mediatype';
import { ListAlbum } from '../albums/listalbum';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  templateUrl: 'album.component.html',
  styleUrls: ['album.component.css']
})
export class AlbumComponent implements OnInit{
  modalRef: BsModalRef;
  private environment = environment;
  constructor(public albumsService: AlbumsService, 
    public countriesService: CountriesService, 
    public mediaService: MediaService, 
    private route: ActivatedRoute, 
    private router: Router,
    private modalService: BsModalService) {
    /*
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });*/
    
  }
  dataAvailable = false;
  albumId: number;
  album: Album;
  medias: Media[];
  countries: ListCountry[];
  modalType: MediaType;

  @ViewChild('f', {static: true}) form: NgForm;

  alertState : string = "hide";

  ngOnInit() {
    this.medias = [];
    this.initializeEmptyAlbum();
    this.getCountries().subscribe(countries => {
      this.countries = countries;

      if (this.route.snapshot.paramMap.get('id') == 'new') {
        return;
      }
      // The JavaScript (+) operator converts the string to a number
      this.albumId = +this.route.snapshot.paramMap.get('id');
      if (this.albumId != null) {
        this.getAlbum().subscribe(album => { 
          this.album = album; 
          this.getMedias(album.id).subscribe(medias => {
            this.medias = medias;
            this.dataAvailable = true;
          });
        });
      }
    });
  }

  initializeEmptyAlbum() {
    this.album = new Album();
    this.album.online = false;
  }

  getCountries(): Observable<ListCountry[]> {
    return this.countriesService.getCountries();
  }
  getMedias(albumId: number): Observable<Media[]> {
    return this.mediaService.getMedias(albumId, MediaType.PHOTO);
  }
  getAlbum(): Observable<Album> {
    return this.albumsService.getAlbum(this.albumId);
  }
  deleteAlbum(): void {
    if (confirm("Are you sure to want to remove the album '" + this.album.name + "' ?")) {
      this.albumsService.deleteAlbum(this.albumId).subscribe(response => console.log("Album deleted !"));
      this.router.navigate(['albums'], {relativeTo: this.route.parent});
    }
  }

  onSubmit() {
    console.log(this.form);
    this.album.albumTypeId = 1;
    if (this.album.id == null) {
      this.albumsService.insertAlbum(this.album)
                          .subscribe(album => { this.album = album; console.log("Album inserted !");this.router.navigate(['albums'], {relativeTo: this.route.parent}); });
    } else {
      this.albumsService.updateAlbum(this.albumId, this.album).subscribe(response => {console.log("Album updated !");this.router.navigate(['albums'], {relativeTo: this.route.parent});});
    }
  }

  addSelection(filePath : string) : void {
    if (this.modalType == MediaType.PHOTO) {
      if(this.selectionExists(filePath)) {
        this.alertState = "show";
        setTimeout(() => {
          this.alertState = "hide";
        }, 2000);
        return;
      }
    }

    let media = new Media();
    media.name = "";
    let mediaTypeId = MediaType[this.modalType];
    media.type = mediaTypeId;
    media.online = true;
    media.url = filePath;
    media.albumId = this.albumId;
    this.mediaService.insertMedia(media).subscribe(media => {

      if (this.modalType == MediaType.PHOTO) {
        this.medias.push(media);
      } else if (this.modalType == MediaType.THUMBNAIL) {
        this.album.thumbnailId = media.id;
        this.album.thumbnailUrl = media.url;
      }
    });
  }

  selectionExists(filePath) : boolean {
    return this.medias.filter(function (m) {return m.url == filePath}).length == 1;
  }

  unselect(id : number):void {
    // Remove item by filtering
    this.mediaService.deleteMedia(id).subscribe(() => {
      this.medias = this.medias.filter(function(media){
        return id != media.id;
      });
    });
  }
  
  openModalPhoto(template: TemplateRef<any>) {
    this.openModal(template, MediaType.PHOTO);
  }
  
  openModalThumbnail(template: TemplateRef<any>) {
    this.openModal(template, MediaType.THUMBNAIL);
  }

  openModal(template: TemplateRef<any>, modalType: MediaType) {
    this.modalType = modalType;
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }
  

}
