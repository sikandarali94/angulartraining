import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

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
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    /* The observer only cares about new data coming in, about an error or about the observable being completed. In other words, the
    observer is the listener. We are creating an observable similar to the one provided by the interval() method that we commented out
    above. */
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        /* We use the .next() method to emit a new value. We use observer.error() to emit an error. We use observer.complete() to signal
        that the observable is complete. */
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
