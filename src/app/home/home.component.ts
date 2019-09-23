import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
        if (count === 5) {
          /* After an observable completes it is done and no other values are emitted after. Also, when an observable completes, RxJS
          automatically unsubscribes from it. */
          observer.complete();
        }
        if (count > 3) {
          /* When an observable emits an error, we don't need to unsubscribe from it as it is unsubscribed from automatically. It is
          important to note that when an observer emits an error, it does not mean that the observable is complete even though an error
          emission cancels the observable. */
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(
      filter(data => data > 0),
      map((data: number) => `Round: ${data + 1}`)
    ).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });

    /* The second method we pass to the subscribe() method is the callback function that executes when an error is emitted by the
    observable. The third method we pass to the subscribe() method is the callback function that executes when the observable is completed.
    Whenever we subscribe and set up our different handler functions, RxJS in the end merges them all together into one object and passes
    that object (also known as the observer) to the observable. The observable will then interact with the observer (through
    observer.next(), observer.error() and observer.complete()) and let the observer know about new data, errors or when it is complete.
    However, we very rarely build our own observables as RxJS and other libraries like Angular provide us with prebuilt observables.
    */
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
