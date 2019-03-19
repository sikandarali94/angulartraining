import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  /* Using something like a Subject in a service to inform the rest of our application of certain events that affects the state of the
  application is a good practice. However, as our app grows using this pattern of subjects within our services might get hard to maintain.
  There is a popular way to maintain the state of large applications: Redux.
  With a Redux approach we have a single central store in our application where we manage our application state. With Redux we might still
  have services to centralize some methods for multiple components. These services and components will receive state from the central store.
  So we have a way of accessing our store and state, but how do we change it? We dispatch so-called Actions for that. Actions are clearly
  defined in this approach where for example we have an action which is 'save post'. The actions will then reach to something called
  Reducers. Reducers are functions we write ourselves which take an action and a potential payload as an input and then do something with it
  to manipulate the original state (and they do this in an immutable way, which means they don't edit the old state but they override it
  with a new state that is first copied from the old state and manipulated).
  We can use Redux in Angular too; it is not exclusive to React. There is a special implementation for Angular called NgRx, which basically
  adapts this Redux approach to fit really nicely into an Angular application (even supporting features like lazy loading where we might
  add things to our single store once a certain module has been added).
   */
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

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
