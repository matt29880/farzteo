import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from '../countries/countries.service';
import { ListCountry } from '../countries/listcountry';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AlbumTypesService } from '../albumtypes/albumtypes.service';
import { AlbumType } from '../albumtypes/albumtype';

@Component({
  templateUrl: 'albumtype.component.html',
  styleUrls: ['albumtype.component.css']
})
export class AlbumTypeComponent implements OnInit {

  constructor(public countriesService: CountriesService, public albumTypesService: AlbumTypesService, 
    private route: ActivatedRoute, private router: Router) {
  }
  dataAvailable = false;
  albumTypeId: number;
  albumType: AlbumType;
  @ViewChild('f') form: NgForm;
  countries: ListCountry[];

  ngOnInit() {
    this.initializeEmptyAlbumType();
    this.getCountries().subscribe(countries => {
      this.countries = countries;

      if (this.route.snapshot.params['id'] == 'new') {
        return;
      }
      // The JavaScript (+) operator converts the string to a number
      this.albumTypeId = +this.route.snapshot.params['id'];
      if (this.albumTypeId != null) {
        this.getAlbumType(this.albumTypeId).subscribe(albumType => { this.albumType = albumType;this.dataAvailable = true; });
      }
    });
  }

  initializeEmptyAlbumType() {
    this.albumType = new AlbumType();
  }

  getAlbumType(albumTypeId : number): Observable<AlbumType> {
    return this.albumTypesService.getAlbumType(albumTypeId);
  }
  deleteAlbumType(): void {
    if (confirm("Are you sure to want to remove the album type '" + this.albumType.name + "' ?")) {
      this.albumTypesService.deleteAlbumType(this.albumType.id).subscribe(response => {
        console.log("Album type deleted !");
        this.router.navigate(['albumtypes'], {relativeTo: this.route.parent});
      });
    }
  }

  onSubmit() {
    console.log(this.form);
    if (this.albumType.id == null) {
      this.albumTypesService.insertAlbumType(this.albumType).subscribe(albumType => { this.albumType = albumType; console.log("Album type inserted !");this.router.navigate(['albumtypes'], {relativeTo: this.route.parent}); });
    } else {
      this.albumTypesService.updateAlbumType(this.albumType.id, this.albumType).subscribe(response => {console.log("Album type updated !");this.router.navigate(['albumtypes'], {relativeTo: this.route.parent});});
    }
  }

  getCountries() : Observable<ListCountry[]> {
    return this.countriesService.getCountries();
  }
}
