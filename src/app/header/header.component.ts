import { Component } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Response} from '@angular/http';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor (private recipeService: RecipeService, private authService: AuthService) {}

  onSaveData() {
    this.recipeService.storeRecipes().subscribe();
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
}