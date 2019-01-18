import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {Response} from '@angular/http';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService, private http: Http, private authService: AuthService) {}

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  replaceRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  /* When we are saving or fetching data, we want it so that this can only happen with a token that goes with the request. We first have
  to change the rules in our Firebase console to allow someone to read or write data when send a valid token with their request. We change
  the rules in our console to:
  {
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
  }
   */

  storeRecipes() {
    const tk = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-82253.firebaseio.com/recipes.json?auth=' + tk, this.recipes);
  }

  fetchRecipes() {
    /* To make a successful request we first need to get the token. We have defined the method in our auth service that does that and we
    invoke that method here, as shown below.
     */
    const tk = this.authService.getToken();
    // .then(
    //   (token: string) => {
    //     /* The token will not automatically be available because getting the token in Firebase is an asynchronous request. We also
    //     cannot place the get method down below into here because that returns an observable which we don't want to have in this callback
    //     function. Therefore, we need to come up with a solution rather than implement this.
    //      */
    //     tk = token;
    //   }
    // );
    /* One slight issue we encounter is that if we remove all the ingredients from a recipe and upload recipes onto Firebase, that
    particular recipe will not have the Ingredient object inside, thus breaking our definition of what a Recipe should have.
     */
    /* To send our request with the token we add the auth query parameter that Firebase recognises and then append to that query parameter
    our JSON token, which Firebase will be able to parse.
     */
    return this.http.get('https://ng-recipe-book-82253.firebaseio.com/recipes.json?auth=' + tk)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          /* For each recipe we want to check if it has an ingredients property.
           */
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              /* If a recipe does not have the ingredients property we add it and set it to an empty array.
               */
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      );
  }
}
