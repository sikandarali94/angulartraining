import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private routes: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.routes.params
          .subscribe(
              (params: Params) => {
                  this.id = +params['id'] < this.recipeService.getRecipes().length ? +params['id']: 0;
                  this.recipe = this.recipeService.getRecipes()[this.id];
              }
          );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
