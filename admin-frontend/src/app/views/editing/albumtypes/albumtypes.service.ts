import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {ListAlbumType} from './listalbumtype';
import {Country} from '../country/country';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { AlbumType } from './albumtype';
import { Album } from '../album/album';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class AlbumTypesService {
  private albumTypesUrl = environment.backendBaseUrl + '/api/albumtype';

  constructor(private http: HttpClient) {}

  getAlbumTypes(): Observable<ListAlbumType[]> {
    return this.http.get<ListAlbumType[]>(this.albumTypesUrl).pipe(
      tap(countries => this.log('fetched album types')),
      catchError(this.handleError('getAlbumTypes', []))
    );
  }

  getAlbumType(id: number): Observable<AlbumType> {
    return this.http.get<AlbumType>(this.albumTypesUrl + "/" + id).pipe(
      tap(country => this.log('fetched album types'))
    );
  }

  insertAlbumType(albumType: AlbumType): Observable<AlbumType> {
    console.log("Try to insert album type");
    return this.http.post<AlbumType>(this.albumTypesUrl, albumType, httpOptions).pipe(
      tap(country => this.log('inserted album type'))
    );
  }

  updateAlbumType(id: number, albumType: AlbumType): Observable<void> {
    console.log("Try to update album type - id = "+id);
    console.log(albumType);
    return this.http.put<void>(this.albumTypesUrl + "/" + id, albumType, httpOptions).pipe(
      tap(country => this.log('updated album type'))
    );
  }

  deleteAlbumType(id: number): Observable<void> {
    console.log("Try to delete the country - id = "+id);
    return this.http.delete<void>(this.albumTypesUrl + "/" + id, httpOptions).pipe(
      tap(country => this.log('deleted album type'))
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