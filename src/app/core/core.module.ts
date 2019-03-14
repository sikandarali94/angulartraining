import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
/* To use HTTP_INTERCEPTORS in our typescript file, we have to first import it from '@angular/core'.
 */
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    /* Since the DropdownDirective is in our shared module and we use the DropDownDirective in our header component, that is why we have
    imported it within our core module.
     */
    SharedModule,
    /* Since we have router links in the header, we should import the AppRoutingModule which contains routes for our app.
     */
    AppRoutingModule
  ],
  exports: [
    /* While we need the AppRoutingModule in our core module, we also need it for our app module because we always need our root routes in
    our app module.
     */
    AppRoutingModule,
    /* We are also exporting our header component into the app module because we use the selector 'app-header' within the app component
    template.
    We don't need to export the HomeComponent because for routing we didn't have to export the declarations and we don't use the home
    selector within the app component template.
     */
    HeaderComponent
  ],
  /* Providing the services in our core module still creates an instance of each of these services for our whole app provided our core
  module is loaded eagerly instead of lazily. The added benefit is that it keeps our app module lean.
   */
  providers: [
    RecipeService,
    AuthService,
    ShoppingListService,
    /* We have to tell Angular that we want to use the interceptor and have to provide the interceptor in providers. However we don't simply
    write AuthInterceptor. We have to use a special syntax. HTTP_INTERCEPTORS is a special placeholder or token that Angular understands; it
    tells Angular that what we will provide here is an Http interceptor. Angular will add it to the pipeline of interceptors that it is
    aware of and send every outgoing request through. So Angular will send every outgoing request through to the interceptors automatically.
    We have to tell Angular what interceptors we have in our app; we do this using the useClass property as shown below. 'multi:true' tells
    Angular we can have multiple interceptors. To set multiple interceptors, we just duplicate the line below for each interceptor we want
    to add.
     */
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class CoreModule {}
