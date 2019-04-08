/* To listen to a router change event and reflect that as a state change, we can do this using the 'router-store'
package of NgRx. To install this package we simply write in the terminal:
npm install --save @ngrx/router-store
 */
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
/* We then simply import all the app reducers that we registered in app.reducers and then pass it to the forRoot() method of StoreModule.
 */
import { reducers } from './store/app.reducers';
/* To use EffectsModule within our TS file, we first must import it from '@ngrx/effects'.
 */
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
/* To use StoreRouterConnectingModule in our ts file, we must first import it from '@ngrx/router-store'.
 */
import { StoreRouterConnectingModule } from '@ngrx/router-store';

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
    /* Below, we defined the global state of our application where it requires we have a shoppingList key, where the shoppingListReducer
    returns an objects with a new array of ingredients when we add ingredients to the shopping list.
     */
    StoreModule.forRoot(reducers),
    /* We register here the effects we want to control, as shown below.
     */
    EffectsModule.forRoot([AuthEffects]),
    /* The package is very simple to set up. All we do is write StoreRouterConnectingModule in our declarations, as shown below.
     */
    StoreRouterConnectingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
