import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
/* With the global reducer we always import the global reducer rather than individual reducers.
 */
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  /* ingredients now becomes an Observable.
   */
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  /* We are connecting the shopping list component to our store.
  Store is a generic type in which we provide the global state that we defined in the app module. We are expecting the reducer to return
  an object that has a new array of ingredients after ingredients are added to the shopping list.
  That is why we wrote {ingredients: Ingredient[]}.
   */
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    /* this.store.select() queries a state and returns an observable.
     */
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
