/* We moved the header component into the core folder where we have the core module.
 */
import { Component } from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Recipe} from '../../recipes/recipe.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor (private recipeService: RecipeService, private authService: AuthService) {}

  onSaveData() {
    this.recipeService.storeRecipes().subscribe(
      (response) => {
        /* The response when we set reportProgress to true looks something like this:
        {
          type: 1, loaded: 500, total: 500
        }
        'total' is the amount of data that needs to be sent/received.
        'loaded' is the amount of data that has been sent/received.
        type: 0' is the send event; 'type: 1' is the upload event; type: '3' is the download event.
         */
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.recipeService.fetchRecipes()
      .subscribe(
        (response: Recipe[]) => this.recipeService.replaceRecipes(response)
      );
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
