import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';

/* Because routes will be responsible for routing components of our whole app, we have to import it
in our app module. We have to import Routes and RouterModule from '@angular/router'.
 */
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {CanActivateChild} from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import {ServerResolver} from './servers/server/server-resolver.service';

/* Our app routes is an array because we will have multiple routes.
 */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    /* We need to import our AppRoutingModule for our routes to work in our app. Thus we imported our routes into app.module.ts.
     */
    AppRoutingModule
  ],
  /* We need to place our AuthService and our AuthGuard, which we created, in our app module in order to use it.
   */
  /* We need to place our CanDeactivateGuard, which we created, in our app module in order to use it.
   */
  /* We need to place our ServerResolver, which we created, in our app module in order to use it.
   */
  providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard, ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
