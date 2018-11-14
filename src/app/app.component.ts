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
  ngForm, it becomes of type: NgForm. This NgForm object has the value object which includes all the values of the controls we have
  defined in our form.
   */
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
