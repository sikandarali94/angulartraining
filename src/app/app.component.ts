import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /* In templateUrl and template we can decide if we want to link to an external template
  or use an inline template. This is the same for styleUrls: we can link to an external
  stylesheet using styleUrls. Please note that styleUrls has the stylesheet strings in an
  array; this is because we can link multiple stylesheets to the component. If we want to
  use an inline style we use the attribute named styles. We used back ticks (`) to allow
  us to write the string in multiple lines.
  */
  // styleUrls: ['./app.component.css']
  styles: [`
    h3 {
        color: dodgerblue;
    }
  `]
})
export class AppComponent {
}
