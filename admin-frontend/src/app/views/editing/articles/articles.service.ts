import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {ListArticle} from './listarticle';
import {Article} from '../article/article';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesUrl = environment.backendBaseUrl + '/api/article';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<ListArticle[]> {
    return this.http.get<ListArticle[]>(this.articlesUrl).pipe(
      tap(articles => this.log('fetched articles')),
      catchError(this.handleError('getArticles', []))
    );
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.articlesUrl + "/" + id).pipe(
      tap(article => this.log('fetched article'))
    );
  }

  insertArticle(article: Article): Observable<Article> {
    console.log("Try to insert article");
    console.log(article);
    return this.http.post<Article>(this.articlesUrl, article, httpOptions).pipe(
      tap(article => this.log('inserted article'))
    );
  }

  updateArticle(id: number, article: Article): Observable<void> {
    console.log("Try to update article - id = "+id);
    console.log(article);
    return this.http.put<void>(this.articlesUrl + "/" + id, article, httpOptions).pipe(
      tap(article => this.log('updated article'))
    );
  }

  deleteArticle(id: number): Observable<void> {
    console.log("Try to delete the article - id = "+id);
    return this.http.delete<void>(this.articlesUrl + "/" + id, httpOptions).pipe(
      tap(article => this.log('deleted article'))
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