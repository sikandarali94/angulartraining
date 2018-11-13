import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.route.params
    /* This subscribe() method here is the observable part. In RxJs terms, this is our subscriber. This subscriber can take in actually
    three methods as arguments. The first method is how to handle the normal data method. The second method is the code that is run if
    an error occurs. The third method is the code that is run when the observable completes. In our routing observable here, it does not
    make sense to have the error handling method or the method when the observable completes because those scenarios don't happen with
    route parameters.
       */
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );
  }

  onActivate() {
    /* We can call next on userActivated. We used next() method in our home component when we created the custom observable. We used next()
    to create a bridge between the Observable and the Observer. Subject, however, is easier as it is an observable and observer at the same
    time. This is why we can conveniently call next here and pass a value.
     */
    this.usersService.userActivated.next(this.id);
  }

}
