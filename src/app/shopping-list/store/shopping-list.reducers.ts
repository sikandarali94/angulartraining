/* We are importing all of our actions.
 */
import * as ShoppingListActions from './shopping-list.actions';

/* To use Action in our TS file, we must first import it from: '@ngrx/store'
 */
import { Action } from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

/* Make sure to use the keyword function here and not an ES6 arrow function.
A reducer function will be triggered whenever an action is dispatched.
Arguments will be passed into a reducer function automatically by NgRx. A reducer function will receive two arguments: the state (current
state of the application) and an action. The first time the redux function runs there will be no current state; that is why we set an
initial current state and make that the default of the state argument.
 */




const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

/* Our action for shoppingListReducer is no longer Action but ShoppingListActions.ShoppingListActions because that is where all of our
actions is for the shopping list feature.
 */
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  /* We have to return the new state of our application with a reducer function.
   */
  /* We use a switch statement to determine what kind of action was dispatched. We check action.type, which is a property provided on the
  action object.
   */
  /* We are trying to dispatch the action defined below whenever we edit the shopping list.
   */
  switch (action.type) {
    /* What is the value of action.type? We can actually set this when we dispatch an action. We typically use simply a string describing
    the action. To make sure we don't mistype anywhere in our app, we typically also store this in a constant, as we have done above.
     */
    /* ADD_INGREDIENT is a unique identifier we created for the AddIngredient action.
     */
    case ShoppingListActions.ADD_INGREDIENT:
      /* Because we have to do this in an immutable way, we are using the spread operator to copy the values from the previous state.
       */
      return {
        ...state,
        /* The new element that we receive is part of the action and we want to receive a payload that is part of the action. By default,
        actions in NgRx are payload-less; they only have the type property. To get the payload we have to define our own clearly typed
        actions.
         */
        /* It took a lot of work to be able to just define our payload here, but the advantage is that it is now really easy to work with.
         */
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
  return state;
}
