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
import {RouterModule, Routes} from '@angular/router';

/* Our app routes is an array because we will have multiple routes.
 */
const appRoutes: Routes = [
    /* The path describes the path Angular will route to. In our case of path: 'users', it will route
    to localhost:4200/users. We have to make sure not to to write '/users' as that will be incorrect.
    component is where we tell Angular what component to load once it loads the path.
     */
    { path: 'users', component: UsersComponent, children : [
      { path: ':id/:name', component: UserComponent},
    ] },
    { path: '', component: HomeComponent },
    /* We repeat ourselves in writing servers in the path repeatedly. By definition, all the paths defined after 'servers' are children
    routes of 'servers' path route. Therefore, we redefine the 'servers' path below to include its children routes so we don't repeat
    ourselves in writing 'servers' all the time.
     */
    { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    /* To register routes in our Angular app, we have to put RouterModule in our imports and use
    forRoot method to register the paths defined in appRoutes.
     */
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
