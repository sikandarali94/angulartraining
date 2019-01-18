import * as firebase from 'firebase';

/* It is appropriate to create a separate service for authentication, like we did here. This service will also be used for creating users.
 */
export class AuthService {
  /* This method will be used for signing up a user.
   */
  signupUser(email: string, password: string) {
    /* createUserWithEmailAndPassword is a firebase method that returns a promise. That is the reason we are using the .catch() method to
    grab any errors that we want to print to the console.
     */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => console.log('yo')
      );
  }
}
