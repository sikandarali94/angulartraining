import { Action } from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

/* Typically, we have our action type constants within an action ts file.
 */
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

/* Convention with class names is that we start with a capital letter of the first word and capitalise subsequent words after that.
 */
export class AddIngredient implements Action {
  /* Because we are implementing Action here, we are forced to provide a read only type property. We set type to the proper defined action
  type constants that we have defined above.
   */
  readonly type = ADD_INGREDIENT;
  /* We have to add a payload manually because not every action will require a payload. To add a payload, we add the payload property, as
  shown below.
   */
  /* Whenever we create an instance of the AddIngredient action, we want to set the payload property of the AddIngredient action. That is
  why we are using the constructor method. The reason we are using the public accessor keyword is because we want to set the payload
  property outside the actions file.
   */
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: {ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

/* Here we are bundling all of our actions we set in this file in one single export. export type is Typescript feature we can use to define
our own type.
 */
/* To bundle multiple actions, we use the union operator (|) as shown below.
 */
export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;
