import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListCountry} from './listcountry';
import {CountriesService} from './countries.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: 'countries.component.html'
})
export class CountriesComponent implements OnInit, OnDestroy {
  constructor(public countriesService: CountriesService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.getCountries();
  }

  listcountry: ListCountry[];

  getCountries(): void {
    this.countriesService.getCountries().subscribe(listcountry => { this.listcountry = listcountry; console.log(this.listcountry);});
  }
  ngOnDestroy(): void {
    this.listcountry = null;
  }

}
