import * as firebase from 'firebase';

/* It is appropriate to create a separate service for authentication, like we did here. This service will also be used for creating users.
 */
export class AuthService {
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
        /* The response we get if authentication is successful is a JSON Web Token. We can see this token in the developer tools in Chrome: go
        to Application->IndexedDB and there we will find the JSON Web Token.
         */
        response => console.log(response)
      )
      .catch(
        error => console.log(error)
      );

  }
}
