import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { PublishType } from './publishType';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class PublishService {
  private publishUrl = environment.backendBaseUrl + '/api/publish';

  constructor(private http: HttpClient) {}

  publish(publishType : PublishType): Observable<Object> {
    console.log("Start publishing");
    return this.http.get(this.publishUrl + '/' + publishType).pipe(
      tap(res => res)
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