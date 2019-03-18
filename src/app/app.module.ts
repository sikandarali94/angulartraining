/* In Angular, the application state is lost whenever we refresh the browser.
In medium-sized apps where we have several components connected to several services, it's hard maintaining that app because the state of the
application depends on so many factors e.g. methods on services being used by many components to update or override existing state and so
forth. That is why we don't want to have too many places within our app where we update or override the state of the application.
 */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
/* To use StoreModule within our TS file, we first must import it from '@ngrx/store'.
 */
import {StoreModule} from '@ngrx/store';
import {shoppingListReducer} from './shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    /* The forRoot() method of StoreModule takes a JS object where we define our reducers with keys that we can name anything we like.
     */
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
