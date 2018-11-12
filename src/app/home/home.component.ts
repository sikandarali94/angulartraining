import { Component, OnInit } from '@angular/core';
/* To create an observable in our Typescript file, we need to first import the Observable package from 'rxjs/Rx' as shown below.
 */
import {Observable} from 'rxjs/Rx';
/* We need to import the whole 'rxjs/Rx' for our custom observable to function.
 */
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /* We are creating an observable here that simply emits numbers in ascending order at every fixed interval.
    interval() is a simple way of creating an observable. In the method we simply pass a number and that would be the milliseconds it should
    wait between emitting data automatically. So interval() will do the data emitting automatically for us.
    This observable in particular will log 0 after 1 second, then log 1 after 1 second, then log 2 after 1 second, and so forth. The
    ascending is stored in the number variable within the subscribe method, as shown below. We can name the number variable whatever we
    like.
     */
    const myNumber = Observable.interval(1000);
    myNumber.subscribe(
        (number: number) => {
          console.log(number);
        }
    );
  }

}
