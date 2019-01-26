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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RecipeSelectComponent } from './recipes/recipe-select/recipe-select.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {RecipeService} from './recipes/recipe.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';

@NgModule({
  /* In the declarations array we define which components or directives or pipes the module uses.
   */
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeSelectComponent,
    RecipeEditComponent,
    SignupComponent,
    SigninComponent
  ],
  /* In imports we define what other modules does the particular module use. When we import another module, we basically import everything
  that that module exports. These modules are bundled with components, directives, services and so forth that we get access to once we
  import the module.
   */
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  /* In the providers array, we simply define which services we may use in this module. It's important to note that when we are providing
  the services in the app module here we are providing the instance of the service to the whole app unless a child component initiates
  another instance of the service.
   */
  providers: [ShoppingListService, RecipeService, AuthService, AuthGuard],
  /* In the bootstrap array, that simply defines our root component. The root component is different to the root module.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
