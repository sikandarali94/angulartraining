/* There is one thing here we don't manage through NgRx and that is asynchronous tasks, or in general, side effects. A side effect simply
describes something which is kind of related to dispatching actions but doesn't alter the app state directly. NgRx gives us a more elegant
way of handling side effects, such that we don't have to leave the NgRx world. For that we need to install a new package. The package is
called @ngrx/effects. To install it via npm, we write this in the terminal:
npm install --save @ngrx/effects
This package makes handling asynchronous tasks (it doesn't have to be asynchronous tasks) very easy.
*/
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducers';

@Injectable()
export class AuthService {
  constructor() {}
}
