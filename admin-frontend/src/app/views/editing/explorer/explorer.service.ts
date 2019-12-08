import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import { FileDetailDto } from './fileDetailDto';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class ExplorerService {
  private filesUrl = environment.siteUrl + '/images';

  constructor(private http: HttpClient) {}

  getFolders(folderPath : string): Observable<string[]> {
    return this.http.get<string[]>(this.filesUrl + '/folder_crawler.php?path=' + folderPath).pipe(
      tap(files => this.log('fetched folders')),
      catchError(this.handleError('getFolders', []))
    );
  }

  getFiles(folderPath : string): Observable<string[]> {
    return this.http.get<string[]>(this.filesUrl + '/file_crawler.php?path=' + folderPath).pipe(
      tap(files => this.log('fetched files')),
      catchError(this.handleError('getFiles', []))
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