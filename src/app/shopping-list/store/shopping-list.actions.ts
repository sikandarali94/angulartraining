import { Action } from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

/* Typically, we have our action type constants within an action ts file.
 */
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

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
  payload: Ingredient;
}

/* Here we are bundling all of our actions we set in this file in one single export. export type is Typescript feature we can use to define
our own type.
 */
export type ShoppingListActions = AddIngredient;
