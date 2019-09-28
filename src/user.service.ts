import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/* "providedIn: 'root'" is a shortcut to explicitly providing the service in our root module (app.module) within the providers array. */
@Injectable({providedIn: 'root'})
export class UserService {
  /* Using an EventEmitter is the old way of doing event emission. A better approach of doing this is using the Subject observable. This is
  because Event Emitters are passive. When we create a typical observable we wrap a callback or an event or something like that. However,
  a Subject is different; while a Subject is an object we can subscribe to, it is more active because we can actively call next on it from
  the outside, as we have done in user.component (note that when we create an Observable we call next() method from the inside rather than
  the outside). So if we don't have a passive event source (like an HTTP request or DOM events) but we have something that actively needs
  to be triggered by us in our application, we can then make use of Subject. We should only use Subjects as cross-component event emitters
  where we manually call the next() method; we don't use Subjects when we are using @Output(), instead we use the Angular-provided
  EventEmitter in this case.*/
  activatedEmitter = new Subject<boolean>();
}
