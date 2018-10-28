import {Component, OnDestroy, OnInit} from '@angular/core';
/* We should import Params from '@angular/router' before we use it in our TypeScript file.
 */
import {ActivatedRoute, Params} from '@angular/router';
/* We should import Subscription from 'rxjs/Subscription' before we use it in our TypeScript file.
 */
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription : Subscription;

  /* The ActivatedRoute object -- which has a lot of meta-data about the current URL -- will give us access to the parameters passed in
  the URL. In our case it is id and name parameter we are looking for.
   */
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      /* The snapshot object holds the parameters passed into the URL. It stores the parameter under the parameter name we defined in our
      routes in the app.module.ts.
       */
      /* By default Angular does not re-instantiate a component if it is already loaded. For example, in user.component.html we created a
      link that changes the data for the user component provided to the URL. However, if we click this link while in the user component
      the user component is not re-instantiated with the new data we provided in the URL.
      Angular does not know that we provided different a data to the user component that is already loaded. Generally destroying a component
      that has already been loaded is a good behaviour by Angular but we need to change this behaviour if the data provided to the already
      loaded component in the URL has changed.
       */
      id: this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    };
    /* Instead of using params in the snapshot object, we can use params in the route object. This params is different to the params in the
    snapshot object. This params is an observable.
    Basically, Observables are a feature added by some other third party package and not by Angular but heavily used by Angular which allow
    us to work with Asynchronous tasks. What we are doing here is an Asynchronous task because the parameters of our currently loaded route
    might change at some point in the future. However, we don't know when, if and how long it will take. That is why we use an observable
    to subscribe to some event which might happen in the future to then execute some code when it happens without having to wait for it.
     */
    /* subscribe method takes in three functions as arguments. The first function is the most important; it will be fired whenever new data
    is sent through the observable. In our case, whenever the parameters in the URL change. Also in our case we only needed to define the
    first function argument for the subscribe method to work.
     */
    /* Whenever we leave the component and Angular destroys it, Angular also removes the subscription to the parameter changes
    automatically. If it didn't, this subscription will ive on in memory even though the component is destroyed. What we added below, to
    unsubscribe from the observable that looks for parameter changes, is just to indicate what happens behind the scenes and we don't
    need to do it. However, other observables we create on a component on the ngOnDestroy lifecycle hook should be unsubscribed to when the
    component is destroyed , and the method we have used to unsubscribe below should be followed.
     */
    this.paramsSubscription = this.route.params
        .subscribe(
            (params: Params) => {
              this.user.id = params['id'];
              this.user.name = params['name'];
            }
        );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
