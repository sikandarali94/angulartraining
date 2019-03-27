/* This is the file where we handle the side effects.
 */
/* To use Effects in our ts file, we must first import it from '@ngrx/effects'.
 */
/* To use ofType in our ts file, we must first import it from '@ngrx/effects'.
 */
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
  /* A side effect in the beginning is just a property.
   */
  /* @Effect() decorator registers, in this case, the authSignup property within the NgRx effects world we can say. NgRx will then watch
  this property and will basically execute the code we assign on the right side of it depending upon conditions we define over there.
   */
  /* Here is an important thing about effects. At the end of our effects chain we typically dispatch a new effect. If we don't do this, we
  can add configuration to the @Effect() decorator and set dispatch to false [@Effect({dispatch: false})], but then we must not also
  dispatch an action at the end of our observable chain. In our case we do dispatch a new action at the end of our observable chain.
   */
  @Effect()
  /* On the right side of the side effects properties we can access an action in our store. To be able to access an action we add a
  constructor method and inject something
   */
  authSignup = this.actions$.pipe(
    /* ofType() helper method allows us to check if the action which is occurring (this.actions$ will be fired for any action) is of a
    special type so that we only continue executing the code for the property (in our case authSignup) if a certain action occurs.
     */
    ofType(AuthActions.TRY_SIGNUP),
    /* We only want the payload of the action. We can use map() here to extract the payload. With all operators we chain after ofType, NgRx
    automatically provides the action to all those operators.
       */
  )
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    /* In this case, switchMap will receive whatever was returned by the map operator.
     */
    .switchMap((authData: {username: string, password: string}) => {
      /* createUserWithEmailAndPassword() returns a promise so that is why we use the fromPromise operator to turn that promise into an
      observable in the end, because all of these chained operator methods should ideally return an observable..
       */
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    /* mergeMap allows us to merge multiple observables into one.
     */
    .mergeMap((token: string) => {
      /* We are returning two observables here that will be merged into one.
       */
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  /* NgRx Effects actually is automatically able to retrieve all the actions from the application state. All we have to do is we have to add
  a private property here of type Actions (where Actions is all the actions of our application state).
   */
  constructor(private actions$: Actions) {
    }
}
