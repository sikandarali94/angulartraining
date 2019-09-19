import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES } from '../recipes/store/recipe.actions';
import { Recipe } from '../recipes/recipe.model';
import { FeatureState } from '../recipes/store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(FETCH_RECIPES)
    .pipe(
      switchMap((action: FetchRecipes) => {
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-82253.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json'
        });
      }),
      map(
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
      )
    );

  @Effect({ dispatch: false })
  recipeStore = this.actions$
    .ofType(STORE_RECIPES)
    .pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest(
          'PUT',
          'https://ng-recipe-book-82253.firebaseio.com/recipes.json',
          state.recipes, {reportProgress: true});
        return this.httpClient.request(req);
      })
    );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<FeatureState>) {}
}
