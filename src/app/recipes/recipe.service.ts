import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {Response} from '@angular/http';
/* To use HttpClient within our TS file, we must first import it from '@angular/common/http'.
 */
import {HttpClient} from '@angular/common/http';

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

  constructor(private slService: ShoppingListService, private httpClient: HttpClient, private authService: AuthService) {}

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
    /* The httpClient still has a put method like the old http client. It's first argument is still the url of where to send the request to
    and the second argument is still the body of data we want to send to the server at the url. However, it accepts more optional arguments
    for more detailed configuration not available in the old http client.
     */
    return this.httpClient.put('https://ng-recipe-book-82253.firebaseio.com/recipes.json?auth=' + tk, this.recipes);
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
    /* We don't to put the .json() method on the data we are getting back. httpClient automatically extracts the data from the response
    and returns it as an object (it assumes we always get json data, but we can change this). We can change this default
    behaviour if we want access to the whole response and not just the data.
     */
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-82253.firebaseio.com/recipes.json?auth=' + tk)
      .map(
        /* We also don't need to use the Response type because httpClient automatically returns the data as an object.
        Also, instead of writing 'recipes: Recipe[]' and stating the type here, we can use a new feature httpClient called typed requests
        where we state the data type by making get(), put(), push() and so on generic methods and stating the type within <> that we are
        getting back, as shown above.
         */
        (recipes) => {
          /* For each recipe we want to check if it has an ingredients property.
           */
          for (const recipe of recipes) {
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
