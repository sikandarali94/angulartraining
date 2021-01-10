import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  URL = 'https://ng-complete-guide-5c4d4-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title, content};

    this.http.post<{ name: string }>(this.URL, postData).subscribe(
      responseData => {
        console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    /* To set multiple query params, we use the append method as shown below. HttpParams() is immutable so we have to always rewrite the
    variable, as shown below. */
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string]: Post }>(this.URL, {
      headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
      params: searchParams
      // Below we are setting a single query param.
      // params: new HttpParams().set('print', 'pretty')
    }).pipe(
      map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key});
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        // Here we can do some error handling.
        console.log('Error');
        /* After we are done handling the error, we should pass it on to the subscribe() method, similar to how we pass data in the map
        operator to the subscribe() method. To do this we use the throwError() function, which yields a new observable by wrapping an error,
        as shown below. */
        return throwError(errorRes);
      })
    );
  }

  clearPosts() {
    return this.http.delete(this.URL);
  }
}
