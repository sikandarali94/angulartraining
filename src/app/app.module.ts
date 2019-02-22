/* A custom module created by us will is called a feature module and is a good way to separate our components, directives, pipes and so
forth bundled in various feature modules in our app. We will later learn how we can use feature modules to speed up our app.
 */

/* We are going to use the Firebase SDK for Email-Password authentication because there is not great REST API from Firebase for this. Make
sure to enable Email-Password authentication on Firebase's console. To install the Firebase SDK we write in the console:
npm install --save firebase

 */
/* Most of the authentication happens on the backend but it is important to understand how to handle authentication on the frontend.
 */
/* JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information
between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a
secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.
Authorization: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT,
allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses
JWT nowadays, because of its small overhead and its ability to be easily used across different domains.
 */
/* An import is a TypeScript feature and is not related to Angular modules in any way. We can see below that we have a lot of import
statements. Although, this is not bad, we can improve this with the use of multiple modules.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {RecipeService} from './recipes/recipe.service';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {RecipesModule} from './recipes/recipes.module';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {ShoppingListService} from './shopping-list/shopping-list.service';

@NgModule({
  /* In the declarations array we define which components or directives or pipes the module uses.
   */
  declarations: [
    AppComponent,
    HeaderComponent
    /* We are copying the dropdown directive to the recipes module because we use it within the components in our recipes folder. However,
    this will give an error and thus we cannot have duplicate declarations in two modules. We can have duplicate services and modules within
    modules,however, not duplicate declarations.
     */
    /* We have an issue here. We want to use the DropdownDirective in both the app module and the recipes module. The issue is that the
    recipes module is a feature module and we cannot have duplicate declarations from both the app module and the recipes module. To fix
    this issue we can use something that we call a: shared module. A shard module is a module not containing a feature but only something
    that is shared across multiple modules.
     */
  ],
  /* In imports we define what other modules does the particular module use. When we import another module, we basically import everything
  that that module exports. These modules are bundled with components, directives, services and so forth that we get access to once we
  import the module.
   */
  imports: [
    /* In the app module, we don't have the CommonModule but instead we have the BrowserModule. The reason for this is that the
    BrowserModule contains all the features of the CommonModule and then some additional features which are only needed at the point in
    time when the application starts and therefore are only needed at the app module.
     */
    BrowserModule,
    HttpModule,
    /* We need to position your RecipesModule prior to the AppRoutingModule.This is required to ensure that the Catch-all/ wildcard routes
    work correctly.
     */
    RecipesModule,
    /* Exporting the CommonModule from the shared module will not overwrite the BrowserModule.
     */
    ShoppingListModule,
    SharedModule,
    AppRoutingModule,
    AuthModule
  ],
  /* In the providers array, we simply define which services we may use in this module. It's important to note that when we are providing
  the services in the app module here we are providing the instance of the service to the whole app unless a child component initiates
  another instance of the service.
   */
  /* We should leave the RecipeService in the app module because it is not only used by the components in the recipes folder but used by
  other parts of the app.
   */
  providers: [RecipeService, AuthService, AuthGuard, ShoppingListService],
  /* In the bootstrap array, that simply defines our root component. The root component is different to the root module.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
