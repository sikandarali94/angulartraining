/* This is the file where we handle the side effects.
 */
/* To use Effects in our ts file, we must first import it from '@ngrx/effects'.
 */
/* To use ofType in our ts file, we must first import it from '@ngrx/effects'.
 */
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  /* A side effect in the beginning is just a property.
   */
  /* @Effect() decorator registers, in this case, the authSignup property within the NgRx effects world we can say. NgRx will then watch
  this property and will basically execute the code we assign on the right side of it depending upon conditions we define over there.
   */
  @Effect()
  /* On the right side of the side effects properties we can access an action in our store. To be able to access an action we add a
  constructor method and inject something
   */
  authSignup = this.actions$.pipe(
    /* ofType() helper method allows us to check if the action which is occurring (this.actions$ will be fired for any action) is of a
    special type so that we only continue executing the code for the property (in our case authSignup) if a certain action occurs.
     */
    ofType(AuthActions.TRY_SIGNUP)
  );

  /* NgRx Effects actually is automatically able to retrieve all the actions from the application state. All we have to do is we have to add
  a private property here of type Actions (where Actions is all the actions of our application state).
   */
  constructor(private actions$: Actions) {
    }
}
