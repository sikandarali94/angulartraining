import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Injectable} from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';

@Injectable()
export class ShoppingListService {
    n = 0;
    ingredientAdded = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients.slice());
    }

    onToShoppingList(ingredients: Ingredient[]) {
        /* Looping is a viable method as commented below, but we can use ES6 spread method (...) to add an array of
        ingredients in one go in the push method, as we have done below.
         */
        // for (let ingredient of ingredients) {
            // this.ingredients.push(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientAdded.emit(this.ingredients.slice());
    }

}
