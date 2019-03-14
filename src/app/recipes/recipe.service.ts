import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
/* To use HttpClient within our TS file, we must first import it from '@angular/common/http'.
 */
/* To use HttpHeaders within our TS file, we must first import it from '@angular/common/http'.
 */
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

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
    // return this.httpClient.put('https://ng-recipe-book-82253.firebaseio.com/recipes.json', this.fetchRecipes(), {
    //   observe: 'events',
      /* If we don't want to hardcode our params, we can set the params using the params property, as shown below. We have to instantiate
      HttpParams() and then we can apply the set() method (to add a param), the append() method (to change an existing param), the delete()
      method (to delete an existing param), the getAll() method (to retrieve all existing params) and so forth.
       */
      // params: new HttpParams().set('auth', tk)
      /* To send a header to the server we instantiate it with new HttpHeaders and then define the header that way with the set() method.
      The set() method takes the name of the header and then the value of the header. To send more than one header we can append to the
      first header using the append() method. For example:
      headers: new HttpHeaders().set('Authorization', 'Bearer adadasdadas').append()
      We don't need to always prepare a header inline with the headers property but we can prepare our headers using new HttpHeaders, set(),
      append() and so forth before in our code within a variable and then use that variable as a value to the headers property.
      Please note that the headers property does not overrule the default headers always sent to the server with each request. Sometimes
      those default headers are determined by the browser in which the app is running.
       */
      // headers: new HttpHeaders().set()
    // });
    /* HttpRequest() is a more advanced way of making a request. The first argument is a string of what type of request we want to set (in
    our case it is 'PUT'). The second argument is the URL we want to send the request to. The third argument is the data we want to send.
    The fourth argument is where we want to configure the request. We are not sending the request, but just defining it.
     */
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-82253.firebaseio.com/recipes.json', this.fetchRecipes(), {
      /* Setting the reportProgress to true will give us feedback about the progress of this request or response. This is useful if we are
      uploading or downloading something.
       */
      reportProgress: true,
      params: new HttpParams().set('auth', tk)
    });
    /* To send the above request, we use the httpClient.request() method and pass the variable which contains the definition of our request.
    This method returns an observable.
     */
    return this.httpClient.request(req);
  }

  fetchRecipes() {
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
    // return this.httpClient.get<Recipe[]>('https://ng-recipe-book-82253.firebaseio.com/recipes.json?auth=' + tk)
    /* We are not fetching the token here, but will use the interceptor to add the token as a param to the HTTP Request.
     */
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-82253.firebaseio.com/recipes.json', {
      /* There are several configurations we can do in the options arguments which is the second argument of the get() method and the third
      argument of the post() method. One configuration we can do is the 'body', where we can define the body of data we want to send with
      the request (of course, we wouldn't do this with a get() request but we can do it with a post() or put() request.). Another
      configuration we can do is the 'headers', where we give the property special parameters (the HTTP headers object).
      The configuration of "observe: 'response'" will not give us the data body automatically but the entire response we get from the
      server. The default of this configuration is: "observe: 'body'"
      The configuration of "responseType: 'text'" will not treat the data we get from the server as json (which is the default) but as text.
      Another value to the responseType can be 'blob', which is useful if we're downloading a file. Another value to the responseType can
      be 'arraybuffer' if we want to buffer some data. There are of course a lot more values to the 'responseType' property we can use (the
      most common option is of course "responseType: 'json'".
       */
      /* We can also set params property for the get request.
       */
      observe: 'body',
      responseType: 'json'
    })
      .map(
        /* We also don't need to use the Response type because httpClient automatically returns the data as an object.
        Also, instead of writing 'recipes: Recipe[]' and stating the type here, we can use a new feature httpClient called typed requests
        where we state the data type by making get(), put(), push() and so on generic methods and stating the type within <> that we are
        getting back, as shown above.
         */
        /* Because we did "responseType: 'text'" in the configuration above, the JSON that is return is treated as text.
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
          return [];
        }
      );
  }
}
