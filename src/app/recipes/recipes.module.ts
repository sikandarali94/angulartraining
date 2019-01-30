/* The recipe module here is known as a feature module.
 */
/* To use NgModule in our TypeScript file, we must first import it from '@angular/core'.
 */
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeSelectComponent} from './recipe-select/recipe-select.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';


/* To create a module we use the @NgModule decorator, as shown below.
 */
@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeSelectComponent,
    RecipeItemComponent
  ],
  /* The imports property here should not be mistaken with the import statements at the top of the file. The ones at the top are recognised
  by TypeScript and the ones within the imports property are recognised by Angular.
   */
  imports : [
    /* We removed the ReactiveFormsModule from the app module because it is only used by the components of the recipe module and not any
    other components outside of it.
     */
    ReactiveFormsModule,
    /* We don't have to add the CommonModule to every feature module. What the CommonModule does is that it gives us access to these common
    directives like ngClass, ngFor, ngIf and so on. Chances are pretty high that every feature module will utilise the common directives.
     */
    CommonModule,
    SharedModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
