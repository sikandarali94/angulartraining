import { Component, OnInit } from '@angular/core';
/* Here we first have to import the model that we want to
use in the recipes list model.
 */
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  /* Here we tell Typescript that recipes is the model we
  defined. The square brackets next to Recipe tells Typescipt
  that recipes is an array of Recipe models.
   */
  recipes: Recipe[] = [
      /* Within the brackets we pass the arguments that the constructor
      function requires as we defined the constructor in the Recipe model.
       */
      new Recipe('A Test Recipe', 'This is simply a test', 'http://dl.maxpixel.freegreatpicture.com/?f=food-1459693_1280.jpg&type=Download&token=717b704582bc9d84a2e69a9902ef91e2&pid=1459693'),
      new Recipe('A Test Recipe 2', 'This is simply a test 2', 'http://dl.maxpixel.freegreatpicture.com/?f=food-1459693_1280.jpg&type=Download&token=717b704582bc9d84a2e69a9902ef91e2&pid=1459693')
  ];
  constructor() { }

  ngOnInit() {
  }

}
