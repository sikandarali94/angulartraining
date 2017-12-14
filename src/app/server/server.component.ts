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
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white;
        }
    `]
})

export class ServerComponent {
    /* Although Typescript will infer it automatically, we can specify what data-type our
    variables will be by using the colon(:) and then specifying the data-type. The variables
    we define in export class can then be used to bind these values to the HTML part of the
    component.
     */
    serverId = 10;
    serverStatus = 'offline';

    /* The constructor() is just a built-in method. Each class has a constructor() method
    which is called once this component is created.
     */
    constructor() {
        /* Math.random() without any arguments gives us a floating point number between 0
        and 1.
         */
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    /* The below example is how we create a method in Typescript.
     */
    getServerStatus() {
        return this.serverStatus;
    }

    getColor() {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }
}
