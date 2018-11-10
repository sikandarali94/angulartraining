/* When we deploy the Angular app to a server online the server parses the URL rather than Angular. So say we have www.domain.com/servers,
the online server will parse this URL and look for a servers folder, however, our Angular app only has index.html. We need to configure
the online server in such a way that if it gives a 404 page not found error, it runs index.html.
 */
/* It is not a good practice to have so many routes defined in app.module.ts as it makes the code look unclean. Instead, we should create
another module for routing. Here we created app-routing.module.ts to hold all the routes as shown below.
 */
/* To create a module we need to first import NgModule as shown below.
 */
import { NgModule } from '@angular/core';
/* We need to import RouterModule to define and export our routes to app.module.ts.
 */
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {HomeComponent} from './home/home.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
/* We should import our guards before we can use them in our TypeScript file.
 */
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
/* We must import our resolver before we can use them in our TypeScript file.
 */
import {ServerResolver} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
    { path: 'users', component: UsersComponent, children : [
            { path: ':id/:name', component: UserComponent},
        ] },
    { path: '', component: HomeComponent },
    /* canActivate is where we add all the route guards we want to apply to the route and will automatically be applied to all the child
    routes. These routes can only be accessed if canActivate in our guard returns true.
     */
    { path: 'servers',
        // canActivate: [AuthGuard],
        /* The advantage of using canActivateChild is that we don't have to individually assign AuthGuard to each of the child routes;
        canActivateChild protects all the child routes of servers in this case.
         */
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children: [
            /* We use the resolve property and map all our resolvers through an object as shown below. The property 'server' in the JS
            object is totally up to us on what name it should be. This name is under which we will receive the data from the resolver.
             */
            { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
            /* Angular will run the CanDeactivateGuard whenever we leave the :id/edit path. We defined the canDeactivate method here
            because our interface requires that we have this method.
             */
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ] },
    // { path: 'not-found', component: PageNotFoundComponent },
    /* We know that we need to display a certain error message when the page is not found. We can pass that error message as static data
    through the data property. This is convenient because we can reuse the error page component to display all kinds of different error
    messages.
     */
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    /* We import the forRoot method to add our routes to the RouterModule.
     */
    /* If we need to support very old browsers that cannot parse paths like www.domain.com/servers in the client, we have an alternative
    approach. This alternative approach involves using a hash sign in the URL. So instead of the URL looking like this:
    www.domain.com/servers it looks like this: www.domain.com/#/servers. The browser will ignore everything to the right of the hash sign
    and load up www.domain.com in where our index.html for the Angular app exists. This even works for servers because they also ignore
    everything after the hash symbol. However, we should try to use the prettier method for HTMl by not hash tagging which allows for
    HTML history mode.
    We can enable hash tagging by adding {useHash: true} as shown below. useHash is false by default.
     */
    imports: [
        RouterModule.forRoot(appRoutes)
        // RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    /* After we have added our routes to the RouterModule we need to export it to app.module.ts.
     */
    exports: [RouterModule]
})

export class AppRoutingModule {

}