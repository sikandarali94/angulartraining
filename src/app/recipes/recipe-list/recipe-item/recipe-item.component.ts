import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() recipeInfo = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  emitDescription() {
    this.recipeInfo.emit(this.recipe);
  }

}
