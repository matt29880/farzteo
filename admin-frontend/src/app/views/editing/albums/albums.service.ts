import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {ListAlbum} from './listalbum';
import {Album} from '../album/album';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private albumsUrl = environment.backendBaseUrl + '/api/album';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<ListAlbum[]> {
    return this.http.get<ListAlbum[]>(this.albumsUrl).pipe(
      tap(albums => this.log('fetched albums')),
      catchError(this.handleError('getAlbums', []))
    );
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(this.albumsUrl + "/" + id).pipe(
      tap(album => this.log('fetched album'))
    );
  }

  insertAlbum(album: Album): Observable<Album> {
    console.log("Try to insert album");
    console.log(album);
    return this.http.post<Album>(this.albumsUrl, album, httpOptions).pipe(
      tap(album => this.log('inserted album'))
    );
  }

  updateAlbum(id: number, album: Album): Observable<void> {
    console.log("Try to update album - id = "+id);
    console.log(album);
    return this.http.put<void>(this.albumsUrl + "/" + id, album, httpOptions).pipe(
      tap(album => this.log('updated album'))
    );
  }

  deleteAlbum(id: number): Observable<void> {
    console.log("Try to delete the album - id = "+id);
    return this.http.delete<void>(this.albumsUrl + "/" + id, httpOptions).pipe(
      tap(album => this.log('deleted album'))
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