/* For routing it is not important that we declare a component in the same file as the routes live. It's just important that we declare them
anywhere in our application before we get a chance of visiting the route. However, for the selector of a component we have to declare it in
the module where we plan to use the selector OR we have to import another module which exports that thing.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {HomeComponent} from './home/home.component';

/* Only allow app to route to RecipeEditComponent if it has stored within a valid token.
 */
const routes: Routes = [
    /* Since we introduced the home component, that means the user might not always visit the recipes section of the app. We can implement
    lazy loading in the recipes module. Therefore, instead of writing 'component: RecipesComponent' with our 'recipe' route, we instead
    write loadChildren. It is important to note that loadChildren takes a string and not a type like HomeComponent. We provide to
    loadChildren the path of the module (without the .ts extension) and then '#' and then the name of the module that we want loaded upon
    navigating to the route we specified, as shown below.
     */
    { path: '', component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
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
