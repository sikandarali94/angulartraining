/* For routing it is not important that we declare a component in the same file as the routes live. It's just important that we declare them
anywhere in our application before we get a chance of visiting the route. However, for the selector of a component we have to declare it in
the module where we plan to use the selector OR we have to import another module which exports that thing.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

/* Only allow app to route to RecipeEditComponent if it has stored within a valid token.
 */
const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    /* The exports is where we define what gets imported into the module that imports this module. Therefore, we are exporting it to another
    module.
     */
    exports: [RouterModule]
})

export class AppRoutingModule {

}
