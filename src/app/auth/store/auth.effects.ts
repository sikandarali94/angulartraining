/* This is the file where we handle the side effects.
 */
/* To use Effects in our ts file, we must first import it from '@ngrx/effects'.
 */
import {Effect} from '@ngrx/effects';

export class AuthEffects {
  /* A side effect in the beginning is just a property.
   */
  /* @Effect() decorator registers, in this case, the authSignup property within the NgRx effects world we can say. NgRx will then watch
  this property and will basically execute the code we assign on the right side of it depending upon conditions we define over there.
   */
  @Effect()
  authSignup
}
