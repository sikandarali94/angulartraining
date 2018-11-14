import {Component} from '@angular/core';
/* We must import NgForm from '@angular/forms' before we can use it in our TypeScript file.
 */
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  /* When we receive the reference to the form, it is of type: ElementRef. However, when we pass a reference to the form that has accessed
  ngForm, it becomes of type: NgForm. This NgForm object has the value property which includes all the values of the controls we have
  defined in our form.
  Apart from the value object, NgForm also has a lot of other properties that hold data about our form. For example, it has a controls
  property which hold data about out controls. Another property, for example, it has is the dirty property, which if true tells us that
  the form has been changed (meaning if value has been entered inside). Another property, for example, NgForm has is the disabled property
  which has a value of true if the form is disabled. Another property, for example, it has is the invalid property which tells us if the
  form is invalid or not (it also has the valid property which is the opposite of invalid property). Another property, for example, it has
  is the touched and untouched property which tells us if any of the form elements have been clicked upon.
   */
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
