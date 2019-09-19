import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    /* We have a little issue here. In the past we could our token synchronously but now we get it asynchronously, because selecting a slice
    of our state yields us an observable (which is an asynchronous object). To fix this issue, we realise that the intercept method requires
    that we output an observable and selecting a slice of our state yields an observable. Thus we return the selecting slice state
    observable, as shown below. We use switchMap because otherwise the observable returned by next.handle(copiedReq) will be wrapped by the
    observable returned by this.store.select('auth'). By using the switchMap it won't return an observable wrapped by another observable but
    instead use the returned value (next.handle(copiedReq)) which is an observable.
     */
    /* The issue is that we create an observable to look for changes in the state and the code inside switchMap fires. So when the state
    changes the code is cloning a request that was not sent in the first place. To fix this we use take(1), which means that after firing
    one event, close the this.store.select() observable stream. The number we pass into take() is the number of emissions we want the
    observable it is attached to to fire before closing the stream.
     */
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copiedReq);
      })
    );
  }
}
