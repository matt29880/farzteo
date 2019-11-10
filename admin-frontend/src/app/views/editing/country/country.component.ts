import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from '../countries/countries.service';
import { Country } from './country';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

enum Continent {
  ASIA = "Asia",
  AMERICA = "America",
  EUROPE = "Europe",
  OCEANIA = "Oceania"
}

@Component({
  templateUrl: 'country.component.html',
  styleUrls: ['country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(public countriesService: CountriesService, private route: ActivatedRoute, private router: Router) {
  }
  dataAvailable = false;
  countryId: number;
  country: Country;
  @ViewChild('f') form: NgForm;

  ngOnInit() {
    this.initializeEmptyArticle();

    if (this.route.snapshot.paramMap.get('id') == 'new') {
      return;
    }
    // The JavaScript (+) operator converts the string to a number
    this.countryId = +this.route.snapshot.paramMap.get('id');
    if (this.countryId != null) {
      this.getCountry().subscribe(country => { this.country = country;this.dataAvailable = true; });
    }
  }

  initializeEmptyArticle() {
    this.country = new Country();
    this.country.online = false;
  }

  getCountry(): Observable<Country> {
    return this.countriesService.getCountry(this.countryId);
  }
  deleteCountry(): void {
    if (confirm("Are you sure to want to remove the country '" + this.country.name + "' ?")) {
      this.countriesService.deleteCountry(this.countryId).subscribe(response => console.log("Country deleted !"));
      this.router.navigate(['countries'], {relativeTo: this.route.parent});
    }
  }

  onSubmit() {
    console.log(this.form);
    if (this.country.id == null) {
      this.countriesService.insertCountry(this.country).subscribe(country => { this.country = country; console.log("Country inserted !");this.router.navigate(['countries'], {relativeTo: this.route.parent}); });
    } else {
      this.countriesService.updateCountry(this.countryId, this.country).subscribe(response => {console.log("Country updated !");this.router.navigate(['countries'], {relativeTo: this.route.parent});});
    }
  }  
  
  getContinents(): Array<string> {
    return Object.keys(Continent);
  }
}
