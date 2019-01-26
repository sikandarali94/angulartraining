import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeSelectComponent} from './recipes/recipe-select/recipe-select.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuard} from './auth/auth-guard.service';

/* Only allow app to route to RecipeEditComponent if it has stored within a valid token.
 */
const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeSelectComponent},
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
        { path: ':id', component: RecipeDetailComponent},
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ]},
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
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
