import {Ingredient} from '../../shared/ingredient.model';
import {InitialState} from '@ngrx/store/src/models';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState = {
  token: null,
  authenticated: false
};

export function authReducer(state = InitialState, action) {
  return state;
}
