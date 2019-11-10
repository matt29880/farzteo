import {Component, OnInit, OnDestroy} from '@angular/core';
import {Trip} from '../trip/trip';
import {TripsService} from './trips.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  templateUrl: 'trips.component.html'
})
export class TripsComponent implements OnInit, OnDestroy {
  constructor(public tripsService: TripsService, 
    private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.getTrips();
  }

  trips: Trip[];

  getTrips(): void {
    this.tripsService.getTrips().subscribe(trips => { this.trips = trips; console.log(this.trips);});
  }
  ngOnDestroy(): void {
    this.trips = null;
  }

}
