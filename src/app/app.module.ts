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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    ] },
    /* We are trying to create a behaviour in Angular where if someone types something in the URL for which we don't have a component to
    load, we give the user an error page which says that the page has not been found.
     */
    { path: 'not-found', component: PageNotFoundComponent },
    /* An alternative to loading components for a specific URL is to redirect the user on a certain URL to another URL. We achieve this
    using redirectTo as shown below.
     */
    /* The method to catch all URLs that have not specified in our routes is to use the double asterisk (**) -- also known as the wildcard
    route -- as shown below. The order is important here: we have to make sure the wildcard route here is the last route specified in our
    routes. This is because our routes get parsed top to bottom.
     */
    { path: '**', redirectTo: '/not-found' }
    /* By default, Angular matches paths by prefix. That means, that the following route will match both '/recipes'  and just '/':
    { path: '', redirectTo: '/somewhere-else' }

    Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

    Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified
    in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").

    To fix this behavior, you need to change the matching strategy to "full":
    { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }

    Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).
     */
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
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
