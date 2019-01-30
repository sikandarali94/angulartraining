import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';

/* Only allow app to route to RecipeEditComponent if it has stored within a valid token.
 */
const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
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
