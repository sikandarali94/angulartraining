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

const appRoutes: Routes = [
    { path: 'users', component: UsersComponent, children : [
            { path: ':id/:name', component: UserComponent},
        ] },
    { path: '', component: HomeComponent },
    { path: 'servers', component: ServersComponent, children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent }
        ] },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    /* We import the forRoot method to add our routes to the RouterModule.
     */
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    /* After we have added our routes to the RouterModule we need to export it to app.module.ts.
     */
    exports: [RouterModule]
})

export class AppRoutingModule {

}