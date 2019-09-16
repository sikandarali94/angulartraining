import { Actions, Effect } from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {FETCH_RECIPES, FetchRecipes, SET_RECIPES} from '../recipes/store/recipe.actions';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(FETCH_RECIPES)
    .switchMap((action: FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-82253.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: SET_RECIPES,
          payload: recipes
        };
      }
    );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
