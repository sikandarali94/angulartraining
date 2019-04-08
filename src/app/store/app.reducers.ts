/* In this file we simply want to export a global application-wide reducer in the end. Here the goal is to export a state which bundles all
the other applications' states.
 */

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
/* To use ActionReducerMap within out TS file, we first must import it from '@ngrx/store'.
 */
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

/* We can bundle our app reducers into a single reducer using ActionReducerMap, as shown below. ActionReducerMap is a generic type in which
we pass AppState interface because it is where we bundled all the application states into a single state.
 */
export const reducers: ActionReducerMap<AppState> = {
  /* Here we define all of the reducers within our entire application.
   */
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};