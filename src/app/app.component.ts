/* We don't actually connect Angular to a database directly, meaning we don't enter our database credentials into our Angular app or
anything like that. This is because everyone can inspect the Angular code. We instead send HTTP requests from Angular to a server and get
a HTTP response from the server back. To interact with the server, we do it through its API. The server is the one that then interacts with
the DB if interacting with the DB is required. */
import { Component, OnInit } from '@angular/core';
/* We import the HttpClient from '@angular/common/http', as shown below. */
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  /* We inject the HttpClient, as shown below. */
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    /* The HttpClient has RESTful verbs we can use to send HTTP requests as methods e.g. post(), delete(), get(), patch(), put(). The post()
    method takes the request URL as the first argument, the URL body as the second argument (Angular automatically converts the JS object to
    JSON). Angular uses observable with these HTTP request methods and that is why we must subscribe to them in order for the request to be
    sent successfully. We don't have to manually unsubscribe, because Angular does it automatically anyway with these methods. */
    this.http.post('https://ng-recipe-book-82253.firebaseio.com/posts.json', postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
