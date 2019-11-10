import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {ListCountry} from './listcountry';
import {Country} from '../country/country';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countriesUrl = environment.backendBaseUrl + '/api/country';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<ListCountry[]> {
    return this.http.get<ListCountry[]>(this.countriesUrl).pipe(
      tap(countries => this.log('fetched countries')),
      catchError(this.handleError('getCountries', []))
    );
  }

  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(this.countriesUrl + "/" + id).pipe(
      tap(country => this.log('fetched country'))
    );
  }

  insertCountry(country: Country): Observable<Country> {
    console.log("Try to insert country");
    console.log(country);
    return this.http.post<Country>(this.countriesUrl, country, httpOptions).pipe(
      tap(country => this.log('inserted country'))
    );
  }

  updateCountry(id: number, country: Country): Observable<void> {
    console.log("Try to update country - id = "+id);
    console.log(country);
    return this.http.put<void>(this.countriesUrl + "/" + id, country, httpOptions).pipe(
      tap(country => this.log('updated country'))
    );
  }

  deleteCountry(id: number): Observable<void> {
    console.log("Try to delete the country - id = "+id);
    return this.http.delete<void>(this.countriesUrl + "/" + id, httpOptions).pipe(
      tap(country => this.log('deleted country'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  }

}