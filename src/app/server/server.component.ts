/* We can create a component using the terminal in Angular CLI. We use the command
in the terminal: ng generate component servers. Please note that 'servers' is the name
we gave to our component. We can name it anything we like. We can also use the shortcut
command: ng g c servers.
 */

/* We must import the @Component decorator first.
Angular comes with some packages and the Component package is one of them.
 */
import { Component } from '@angular/core';

/* To tell Typescript that this class is a component we must use a special decorator.
Decorators are a Typescript feature which allow us to enhance our classes for example;
enhance our elements in our code. It is not restricted to classes only. Decorators are
always attached by adding a @ sign in front of them.
*/

@Component({
    // selector references the HTML element which will load up the component we define.
    selector: 'app-server',
    // templateUrl tells Typescript/Angular where our component HTML file is.
    templateUrl: './server.component.html'
})

export class  ServerComponent {
}
