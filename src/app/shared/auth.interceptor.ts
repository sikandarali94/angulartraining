/* To use HttpInterceptor, HttpEvent, HttpHandler and HttpRequest in our TS file, we must first import it from '@angular/common/http'.
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/* An interceptor is used to check every outgoing request and manipulate it. For example, with an interceptor we can manipulate the params
or headers of every outgoing request. We implement the HttpInterceptor interface to an interceptor.
 */
export class AuthInterceptor implements HttpInterceptor {
  /* The intercept method gets two arguments: the HttpRequest (which is a generic type) and HttpHandler. It returns an observable because
  Angular uses observables to wrap a Http request. The observable will give us back a Http Request (which is a generic type of any because
  it could be any event which is returned).
  HttpHandler is an object which will give us a special method we can execute to let our request continue its journey. If we never call this
  method, the request will never leave our app.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    /* We pass to the HttpHandler's handle method the http request. This will let the request continue its journey. At this point, after
     * we have intercepted the request and made changes to the request, we let the request continue on its journey. If we wrote 'return
     * null' instead, it will block the outgoing http request from leaving the app and to the server. */
    return next.handle(req);
  }
}
