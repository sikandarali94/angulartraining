/* In this file we simply want to export a global application-wide reducer in the end. Here the goal is to export a state which bundles all
the other applications' states.
 */

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}
