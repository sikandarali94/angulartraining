import {Recipe} from './recipe.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
    ];

    getRecipes() {
        /* Using slice() like we did below makes a copy of the array, which means when we return the recipes
        array we don't return a reference to the recipes array in our service. This makes sure that any changes
        to a recipes array does not affect the original recipes array in our service.
         */
        return this.recipes.slice();
    }
}
