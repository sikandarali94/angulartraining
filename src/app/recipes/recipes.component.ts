import {Component, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeInfo: Recipe = {name: '', description: '', imagePath: ''};
  receiveRecipeInfo(event) {
    this.recipeInfo = event;
  }

  constructor() { }

  ngOnInit() {
  }

}
