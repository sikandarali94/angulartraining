import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  user1Activated = false;
  user2Activated = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    /* Since a Subject is both an observer and an observable at the same time, we can also subscribe() to userActivated as well call next()
    on it. Subject is similar to the event emitter and in fact the built-in event emitter of Angular is based off the Subject object. It
    is better to use the Subject object instead of the event emitter for cross-component communication. We can even use error() method
    and complete() method on the Subject object.
     */
    this.usersService.userActivated.subscribe(
        (id: number) => {
          if (id === 1) {
            this.user1Activated = true;
          } else if (id === 2) {
            this.user2Activated = true;
          }
        }
    );
  }

  ngOnDestroy() {
    this.usersService.userActivated.unsubscribe();
  }
}
