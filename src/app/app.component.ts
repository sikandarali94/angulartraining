import {Component, OnInit} from '@angular/core';
/* Here were are loading everything from the Firebase SDK package that we installed.
 */
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  /* We should configure the Firebase SDK at the point when our app is initialized. That is why we are configuring the Firebase SDK in
  app.component.ts within the ngOnInit lifecycle hook.
   */
  ngOnInit() {
    firebase.initializeApp({
      /* In our case, we need the apiKey and authDomain. We can find this in our Firebase console under Web setup on the top right within
      the Authentication page.
       */
      apiKey: 'AIzaSyAJRo6BANushcKkNdOezRvDaGbTL3P_rTk',
      authDomain: 'ng-recipe-book-82253.firebaseapp.com'
    });
  }

}
