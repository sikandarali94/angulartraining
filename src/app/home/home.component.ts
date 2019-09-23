import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  /* Some observables will keep on emitting values, so we should always unsubscribe from them when we don't need values from them anymore,
   as shown below. Otherwise, we could get memory leaks. */
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    /* A simple method to create an observable is using the interval method, as shown below. it is very similar to setInterval() method,
    except that it emits a new value (starting from 0 and incrementing by 1) every certain amount of time (we provide that interval as
    milliseconds, as shown below). */
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
