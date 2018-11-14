import {Component, ViewChild} from '@angular/core';
/* We must import NgForm from '@angular/forms' before we can use it in our TypeScript file.
 */
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* Rather than passing a local reference into a method, we can directly grab it using @ViewChild and store it in a variable of NgForm
  type, as shown below. This is helpful if we want to access the form before it is submitted. When we passed a local reference in the
  previous method, we got only access to the form when it was submitted.
   */
  @ViewChild('f') signupForm: NgForm;
  /* In the model, we can set the default select option by storing the value of the select option we want to be displayed by default.
   */
  defaultQuestion = 'teacher';
  /* answer is populated with data written by the user in the textarea.
   */
  answer = '';
  /* This genders array will be used to generate radio buttons of our form.
   */
  genders = ['male', 'female'];

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
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);
  }
}
