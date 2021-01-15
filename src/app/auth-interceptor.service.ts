import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  /* An interceptor will basically run code before our request leaves our app, so before it really is sent and right before the response is
  forwarded to subscribe (using next). Therefore, with an interceptor, for example, we can attach custom headers to all outgoing requests
  in order to authenticate a user. The req object has all the information about the request, like the URL and so on. */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
    /* We use next to let the request continue after modifying it. Otherwise, the request will not continue and could break our app that
    is reliant on the request. */
    return next.handle(req);
  }
}
