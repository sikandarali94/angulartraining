/* We don't actually connect Angular to a database directly, meaning we don't enter our database credentials into our Angular app or
anything like that. This is because everyone can inspect the Angular code. We instead send HTTP requests from Angular to a server and get
a HTTP response from the server back. To interact with the server, we do it through its API. The server is the one that then interacts with
the DB if interacting with the DB is required. */
import { Component, OnInit } from '@angular/core';
/* We import the HttpClient from '@angular/common/http', as shown below. */
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  /* We inject the HttpClient, as shown below. */
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    /* The HttpClient has RESTful verbs we can use to send HTTP requests as methods e.g. post(), delete(), get(), patch(), put(). The post()
    method takes the request URL as the first argument, the URL body as the second argument (Angular automatically converts the JS object to
    JSON). Angular uses observable with these HTTP request methods and that is why we must subscribe to them in order for the request to be
    sent successfully. We don't have to manually unsubscribe, because Angular does it automatically anyway with these methods. */
    this.http.post<{ name: string }>('https://ng-recipe-book-82253.firebaseio.com/posts.json', postData).subscribe(
      responseData => {
        console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    /* .pipe() method allows us to funnel our observable data through multiple operators before they react the .subscribe() method. */
    /* HTTPClient methods in Angular are generic, therefore we can indicate within angled brackets what type of data we will receive within
    the body, as shown below. This is a recommended practice to do. */
    this.http.get<{ [key: string]: Post }>('https://ng-recipe-book-82253.firebaseio.com/posts.json').pipe(
      map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key});
          }
        }
        return postsArray;
      })
    ).subscribe(posts => {
      console.log(posts);
    });
  }
}
