/* To use Action in our TS file, we must first import it from: '@ngrx/store'
 */
import { Action } from '@ngrx/store';
import {Ingredient} from '../shared/ingredient.model';

/* Make sure to use the keyword function here and not an ES6 arrow function.
A reducer function will be triggered whenever an action is dispatched.
Arguments will be passed into a reducer function automatically by NgRx. A reducer function will receive two arguments: the state (current
state of the application) and an action. The first time the redux function runs there will be no current state; that is why we set an
initial current state and make that the default of the state argument.
 */

/* We export this constant because we'll later also want to use it in other files. We typically use uppercase characters to name the
constants and use the same name as the value; the name should be descriptive so other developers can follow along.
 */
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  /* We have to return the new state of our application with a reducer function.
   */
  /* We use a switch statement to determine what kind of action was dispatched. We check action.type, which is a property provided on the
  action object.
   */
  switch (action.type) {
    /* What is the value of action.type? We can actually set this when we dispatch an action. We typically use simply a string describing
    the action. To make sure we don't mistype anywhere in our app, we typically also store this in a constant, as we have done above.
     */
    case ADD_INGREDIENT:
      /* Because we have to do this in an immutable way, we are using the spread operator to copy the values from the previous state.
       */
      return {
        ...state,
        /* The new element that we receive is part of the action and we want to receive a payload that is part of the action. By default,
        actions in NgRx are payload-less; they only have the type property. To get the payload we have to define our own clearly typed
        actions.
         */
        ingredients: [...state.ingredients, action]
      };
  }
  return state;
}
