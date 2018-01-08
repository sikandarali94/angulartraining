import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredient = new EventEmitter<Ingredient>();
  getNewIngredient(ingredientNameElement: HTMLInputElement, ingredientAmountElement: HTMLInputElement) {
    this.newIngredient.emit(new Ingredient(ingredientNameElement.value, Number(ingredientAmountElement.value)));
  }
  constructor() { }

  ngOnInit() {
  }

}
