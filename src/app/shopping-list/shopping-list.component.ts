import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

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
  constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    /* this.store.select() queries a state and returns an observable.
     */
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
