/* To learn about observables in depth we should refer to the rxjs documentation online.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
/* To create an observable in our Typescript file, we need to first import the Observable package from 'rxjs/Rx' as shown below.
 */
import {Observable} from 'rxjs/Rx';
/* We need to import the whole 'rxjs/Rx' for our custom observable to function.
 */
import 'rxjs/Rx';
/* We need to import Observer from 'rxjs/Rx' before we can use it in our TypeScript file.
 */
import {Observer} from 'rxjs/Rx';
/* We need to import Subscription from 'rxjs/Rx' before we can use it in our TypeScript file.
 */
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  /* We should store our subscriptions separately variables of Subscription type, as shown below.
   */
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    /* We are creating an observable here that simply emits numbers in ascending order at every fixed interval.
    interval() is a simple way of creating an observable. In the method we simply pass a number and that would be the milliseconds it should
    wait between emitting data automatically. So interval() will do the data emitting automatically for us.
    This observable in particular will log 0 after 1 second, then log 1 after 1 second, then log 2 after 1 second, and so forth. The
    ascending is stored in the number variable within the subscribe method, as shown below. We can name the number variable whatever we
    like.
     */
    /* Like the observable interval below, when we switch away from this component the observable is still subscribed to and keeps
    running the methods it has been provided. This is a real issue and eventually causes a memory leak. So we have to make sure to
    unsubscribe if we leave the area where we handle this observer.
     */
    const myNumber = Observable.interval(1000);
    this.numbersObsSubscription = myNumber.subscribe(
        (number: number) => {
          console.log(number);
        }
    );

    /* We are constructing a custom observable that will fire after 2 seconds, 4 seconds and fails at 5 seconds.
    .create() method takes a function as an argument and this function should hold our asynchronous code.
    The Observer should not be confused with the subscriber of the subscribe() method. The Observer we pass here will be our final
    observer but we pass it to this anonymous function which will make up our observable. So we will basically tell the Observer when it
    will receive which data which we of course need to do. When we then subscribe to it and use the Observer to react to the data, the
    Observer will know when to react because the Observable tells it. When building a custom observable we need to build this gap between
    Observer and Observable.
    <string> tells Angular what type of data this Observer will emit.
     */
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        /* next() method emits a normal data package. Inside the parenthesis is where we define the data package we want to emit.
         */
        observer.next('first package');
      },2000);

      setTimeout(() => {
        observer.next('second package');
      }, 4000);

      setTimeout(() => {
        /* Error will cause the observable to fail and we can pass the error message inside it.
         */
        // observer.error('this does not work');
        /* The reason why we commented out the observer.error line above is because an observer does not complete if it throws an error.
        complete() method tells the Observable that it is complete. After complete() method no code after in the observable is run.
         */
        observer.complete();
      }, 5000);

        setTimeout(() => {
          /* This data won't emit after 6 seconds because the observable is complete after 5 seconds as defined in the previous
          setTimeout() method.
           */
          observer.next('third package');
        }, 6000);
    });

    /* Here we are subscribing to our custom observable. The first method will handle the data package it receives. The second method will
    trigger when our custom observable fails. The third method will trigger when our observable is complete.
     */
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      /* We can't pass data to when an observable completes.
       */
      () => {
        console.log('completed');
      }
    )
  }

  ngOnDestroy() {
    /* ngOnDestroy() lifecycle hook signifies when we leave the component, which causes the component to be destroyed. This is where we
    should unsubscribe from the observables inside the component, as shown below.
     */
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}
