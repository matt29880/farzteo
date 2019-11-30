import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { TripsService } from '../trips/trips.service';
import { Trip } from './trip';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Media } from '../media/media';
import { MediaType } from '../media/mediatype';
import { MediaService } from '../media/media.service';
import { ArticlesService } from '../articles/articles.service';
import { AlbumsService } from '../albums/albums.service';
import { ListArticle } from '../articles/listarticle';
import { ListAlbum } from '../albums/listalbum';
import { Article } from '../article/article';
import {environment} from '../../../../environments/environment';

@Component({
  templateUrl: 'trip.component.html',
  styleUrls: ['trip.component.css']
})
export class TripComponent implements OnInit {
  modalRef: BsModalRef;
  private environment = environment;

  constructor(public tripsService: TripsService, 
    private route: ActivatedRoute, 
    private router: Router,
    public mediaService: MediaService,
    public articlesService: ArticlesService,
    public albumsService: AlbumsService,
    private modalService: BsModalService) {
  }
  dataAvailable = false;
  tripId: number;
  trip: Trip;
  availableArticles: ListArticle[];
  availableAlbums: ListAlbum[];
  tripArticles: Article[];
  tripAlbums: Article[];
  selectedArticle: number;
  selectedAlbum: number;
  @ViewChild('f', {static: true}) form: NgForm;

  ngOnInit() {
    this.initializeEmptyArticle();

    if (this.route.snapshot.paramMap.get('id') == 'new') {
      return;
    }
    // The JavaScript (+) operator converts the string to a number
    this.tripId = +this.route.snapshot.paramMap.get('id');
    if (this.tripId != null) {
      this.getTrip().subscribe(trip => { this.trip = trip;this.dataAvailable = true; });
    }
    this.articlesService.getArticles().subscribe(articles => { this.availableArticles = articles;});
    this.tripsService.getTripArticles(this.tripId).subscribe(articles => { this.tripArticles = articles;});
    this.albumsService.getAlbums().subscribe(albums => { this.availableAlbums = albums;});
    this.tripsService.getTripAlbums(this.tripId).subscribe(albums => { this.tripAlbums = albums;});
  }

  initializeEmptyArticle() {
    this.trip = new Trip();
    this.trip.online = false;
  }

  getTrip(): Observable<Trip> {
    return this.tripsService.getTrip(this.tripId);
  }
  deleteTrip(): void {
    if (confirm("Are you sure to want to remove the trip '" + this.trip.name + "' ?")) {
      this.tripsService.deleteTrip(this.tripId).subscribe(response => console.log("Trip deleted !"));
      this.router.navigate(['trips'], {relativeTo: this.route.parent});
    }
  }

  onSubmit() {
    console.log(this.form);
    if (this.trip.id == null) {
      this.tripsService.insertTrip(this.trip).subscribe(trip => { this.trip = trip; console.log("Trip inserted !");this.router.navigate(['trips'], {relativeTo: this.route.parent}); });
    } else {
      this.tripsService.updateTrip(this.tripId, this.trip).subscribe(response => {console.log("Trip updated !");this.router.navigate(['trips'], {relativeTo: this.route.parent});});
    }
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
      console.log("Thumbnail added ! " + media);
      this.trip.thumbnailId = media.id;
      this.trip.thumbnailUrl = media.url;
    });
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }

  addArticle(selectedArticle : number) {
    console.log("Add selectedArticle " + selectedArticle);
    this.tripsService.addTripArticle(this.tripId, selectedArticle)
        .subscribe(res => { console.log("Added !!")});
  }

  addAlbum(selectedAlbum : number) {
    console.log("Add selectedAlbum " + selectedAlbum);
    this.tripsService.addTripAlbum(this.tripId, selectedAlbum)
        .subscribe(res => { console.log("Added !!")});
  }
}
