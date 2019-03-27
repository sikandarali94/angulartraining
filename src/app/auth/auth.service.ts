import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    /* Below we are dealing with an asynchronous operation and there are other asynchronous operations happening in this service. The issue
    is that asynchronous operations cannot be handled inside reducers. Reducers simply take a state as an input and then output a new state,
    which has to happen synchronously.
     */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.Signup());
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new AuthActions.SetToken(token));
              }
            );
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.Signin());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new AuthActions.SetToken(token));
              }
            );
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
