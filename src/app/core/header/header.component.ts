/* We moved the header component into the core folder where we have the core module.
 */
import { Component } from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Recipe} from '../../recipes/recipe.model';
import {AuthService} from '../../auth/auth.service';
/* To use HttpEvent in our TS file we have to first import it from '@angular/common/http'
 */
import {HttpEvent} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor (private recipeService: RecipeService, private authService: AuthService) {}

  onSaveData() {
    this.recipeService.storeRecipes().subscribe(
      /* When we set "observe: 'events'" in the put request within the storeRecipes() function the response we get back is of HttpEvent.
      Http Client knows many type of events. In our case, it logged two things in the console because there were two different events. To
      tell what type of event was emitted, it is stored within the type property within the response object. The first type of event we got
      was 'type: 0' in the response object; this event means that a request was sent to the server. The second type of event we got was
      'type: 4' in the response object; this event means that we got a response from the server.
       */
      (response: HttpEvent<Object>) => {
        console.log(response);
        /* To check if a sent event occured we can do: 'response.type === HttpEventType.Sent' (make sure to import HttpEventType from
        '@angular/common/http'). There are other events we can check with HttpEventType (please refer to the documentation).
        To check if a response event occurred we can do: 'response.type === HttpEventType.Response'.
         */
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
