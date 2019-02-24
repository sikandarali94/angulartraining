/* Say we provide a service in the app module and then provide the same service in a feature module (not loaded lazily). At the point
the application starts we have a Root Injector for the entire application and the service provided in the feature module is added to the
root injector and also the service provided in the root app module. So basically in the whole application we're going to have one of the
same instance of the service and there won't be a special instance of the service for the feature module.
When a feature module is lazily loaded at a later time it also uses the service in the root injector (in this instance we haven't provided
the service in the lazy loaded feature module). However, if we provide the service in the lazy loaded feature module and when that module
is loaded, Angular will provide a Child Injector for the service in the lazy loaded feature module. This means that a special instance of
the service is created for the lazy loaded feature module and it will not use the root injector of the service that the rest of the
application will use.
In a feature module that is not lazily loaded, if we want to provide a service whose scope is only within the feature module and not the
root of the app, we should provide that service in a component within the feature module rather than on the feature module itself.
If we provide a service in a shared module (in this example, thjs shared module is connected to a feature module and a lazy loaded feature
module), the service is added to the root injector, however the lazy loaded feature module will not use the service added to the root
injector. Instead, when the lazy loaded feature module is loaded in the app, Angular will create a child injector for the service provided
in the shared module and the lazy loaded feature module will use the child injector. We shouldn't do this because the behaviour is odd. We
would expect that the service in the shared module be shared with the rest of the application, however the service is isolated from the
rest of the app (so not being shared at all) when the lazy loaded feature module connected to the shared module is loaded. In summary:
don't provide services in shared modules, especially if we plan to use them in lazy loaded modules!
 */
/* There are sections of our app contained within feature modules that the user never visits. However, our overall JS bundle which contains
the whole app is downloaded entirely in the beginning when the user opens the app. That means that a lot of the code might never be used
because the user never visits certain sections within our app. This causes performance issues when the app is first loading.
Lazy Loading fixes this issue because it allows us to lazy load feature modules and the routes contained within whenever the user needs
it by visiting the components of the feature module. In other words, when the user goes to a route registered within a feature module, only
then does Angular lazy load the contents of that feature module.
 */
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
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  /* In the declarations array we define which components or directives or pipes the module uses.
   */
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
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
    /* The issue right now is that we eagerly load the RecipesModule into our app module, meaning the whole RecipesModule is loaded when the
    app starts. That is why we have removed the RecipesModule from the imports, as shown below -- we want to lazy load the RecipesModule.
     */
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
