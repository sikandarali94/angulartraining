/* We don't actually connect Angular to a database directly, meaning we don't enter our database credentials into our Angular app or
anything like that. This is because everyone can inspect the Angular code. We instead send HTTP requests from Angular to a server and get
a HTTP response from the server back. To interact with the server, we do it through its API. The server is the one that then interacts with
the DB if interacting with the DB is required. */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
