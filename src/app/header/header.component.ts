import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() viewState = new EventEmitter<{recipeState: boolean}>();
  showRecipes = true;
  showState (link: string) {
    if (link === 'recipe') {
      return this.showRecipes === true ? '#333' : '#777';
    } else if (link === 'shopping') {
      return this.showRecipes === true ? '#777' : '#333';
    }
  }
  stateEmit() {
    this.viewState.emit({recipeState: this.showRecipes});
  }
}
