import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  URL = 'https://ng-complete-guide-5c4d4-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title, content};

    this.http.post<{ name: string }>(this.URL, postData, {
      /* observe: 'body' means that we get the response data extracted and converted to a JS object automatically. observe: 'response' gives
      us back the full HTTP response object. */
      observe: 'response'
    }).subscribe(
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
    /* We can observe various events that occur during a HTTP call. We can then write logic depending upon what type of event occurs during
    the call, as shown below. HttpEventType is an enum and allows us to be more explicit in our code in regards to what event we are
    referring to. event.type in the end is just a number; for example, event.type = 0 means a Sent event occurred, event.type = 4 means a
    Response event occurred, and there are many more events apart from these we can observe. */
    return this.http.delete(this.URL, {
      observe: 'events',
      /* Instead of wanting JSON back in our body, we can modify the response body type to be returned as a text rather than JSON, as shown
      below. The default value is 'json'. */
      responseType: 'text'
    }).pipe(tap(event => {
      if (event.type === HttpEventType.Sent) {
        // ...
      }

      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
