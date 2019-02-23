/* From the three features of our app: recipes, shopping-list and auth, shopping-list is the only feature that the user might not visit.
This is because recipes is always loaded when the user starts the app and the user needs to use the auth feature to log in and use the app.
That leaves us only with shopping-list that the user might not visit.
 */
import {NgModule} from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class ShoppingListModule {}
