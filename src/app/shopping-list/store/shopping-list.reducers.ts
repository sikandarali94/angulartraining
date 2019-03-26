/* We are importing all of our actions.
 */
import * as ShoppingListActions from './shopping-list.actions';

import {Ingredient} from '../../shared/ingredient.model';

/* Make sure to use the keyword function here and not an ES6 arrow function.
A reducer function will be triggered whenever an action is dispatched.
Arguments will be passed into a reducer function automatically by NgRx. A reducer function will receive two arguments: the state (current
state of the application) and an action. The first time the redux function runs there will be no current state; that is why we set an
initial current state and make that the default of the state argument.
 */

/* We are defining and exporting interfaces for our state so we can use it in the rest of the app rather than repeatedly defining it from
scratch.
 */
export interface AppState {
  shoppingList: State;
}


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
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

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      /* A cool way to update an object immutably.
       */
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      /* A cool way to delete items from an object immutably.
       */
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
  return state;
}
