import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
/* It is appropriate to create a separate service for authentication, like we did here. This service will also be used for creating users.
 */
export class AuthService {
  token: string;

  constructor(private router: Router) {

  }
  /* This method will be used for signing up a user.
   */
  signupUser(email: string, password: string) {
    /* createUserWithEmailAndPassword is a firebase method that returns a promise. That is the reason we are using the .then() method to
    grab any errors that we want to print to the console.
     */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        (error) => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    /* The firebase package has a method called signInWithEmailAndPassword() which authenticates with Firebase whether the user is valid.
     */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        /* The response we get if authentication is successful is a JSON Web Token. We can see this token in the developer tools in Chrome:
        go to Application->IndexedDB and there we will find the JSON Web Token.
         */
        response => {
          /* Once the user has signed in successfully, we then want to navigate the user away from the sign in page.
           */
          this.router.navigate(['/']);
          /* When we are signing in we request a token as shown below. This makes sense because once a user has signed in successfully we
          want to get the valid token. This also assures that we have an already stored token with which to save or fetch our data from the
          Firebase service.
           */
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        error => console.log(error)
      );

  }

  logout() {
    /* The firebase package has a method called signOut which removes the stored token in the browser and thus virtually signing the
    user out.
     */
    firebase.auth().signOut();
    /* While the token has been removed from the browser, we also should make sure to remove it from our app.
     */
    this.token = null;
  }

  /* This method would allow us to retrieve the stored JSON Web Token for authentication.
   */
  getToken() {
    /* The getIdToken() will not get us a token synchronously but asynchronously. This is because this method will check with Firebase if
    the stored JSON Web Token is still valid (meaning, it hasn't expired) and, if not, it will retrieve a valid JSON web token from
    Firebase. That is why the method is asynchronous. If this method just retrieved the token stored in our app, then the method will be
    synchronous. Therefore this method returns a promise.
     */
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    /* We don't want to wait for the getIdToken() to successfully be done before we return the token. This is because we already have a
    token stored when the user signs in. The downside to this method is that the already stored token might be expired which causes an
    authentication error. In that case we can implement error handling to request the user to try again to save or fetch data in our app.
     */
    return this.token;
  }

  /* The method indicates if someone using the app is authenticated or not.
   */
  isAuthenticated() {
    /* If the token is null that means we are not authenticated, therefore, if token is not null that means we are authenticated.
     */
    return this.token != null;
  }
}
