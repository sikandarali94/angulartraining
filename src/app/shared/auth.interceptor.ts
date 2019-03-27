import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    /* We have a little issue here. In the past we could our token synchronously but now we get it asynchronously, because selecting a slice
    of our state yields us an observable (which is an asynchronous object). To fix this issue, we realise that the intercept method requires
    that we output an observable and selecting a slice of our state yields an observable. Thus we return the selecting slice state
    observable, as shown below. We use switchMap because otherwise the observable returned by next.handle(copiedReq) will be wrapped by the
    observable returned by this.store.select('auth'). By using the switchMap it won't return an observable wrapped by another observable but
    instead use the returned value (next.handle(copiedReq)) which is an observable.
     */
    return this.store.select('auth')
      .switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copiedReq);
      });
    // return null;
  }
}
