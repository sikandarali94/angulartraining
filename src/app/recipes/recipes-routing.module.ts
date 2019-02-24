import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipesComponent} from './recipes.component';
import {RecipeSelectComponent} from './recipe-select/recipe-select.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
  /* Since we already provided the 'recipes' route path in the app-routing.module.ts file, the 'recipes' route here will not work. We just
  specify an empty path, because we want to load the RecipesComponent when navigated to '/recipes' path in the browser.
   */
  { path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeSelectComponent},
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
      { path: ':id', component: RecipeDetailComponent},
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] },
];

@NgModule({
  imports: [
    /* Here, and it is important, we don't call the forRoot method but instead forChild method. It is important that we only call forRoot()
    in our app module (in our root module). If we register routes anywhere else in our app, we must use forChild() as we have done below.
    This is because we are not in a root module here but in a child module. Everything eventually gets imported into the root module; that
    is why it is called the root module and therefore the routes registered here will eventually be available throughout the whole
    application.
     */
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    /* The only place where we use the AuthGuard is in our recipes-routing module. It makes more sense to have it not in our core module but
    in our recipes-routing module.
     */
    AuthGuard
  ]
})
export class RecipesRoutingModule {

}
