/* We need to import ActivatedRouteSnapshot, CanActivate and RouterStateSnapshot package from '@angular/router' before we can use it in
our TypeScript file.
 */
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
/* We need to import Observable package from 'rxjs' before we can use it in our TypeScript file.
 */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
/* We are injecting out auth.service.ts that we created.
 */
import {AuthService} from './auth.service';

/* We are injecting our auth.service.ts here so we must declare @Injectable() because we are injecting a service into another service.
 */
@Injectable()
/* Since we are using auth=guard.service.ts as a guard rather than an actual service, it is fitting to name it AuthGuard rather than
AuthGuardService.
 */
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    /* For CanActivate we are getting the arguments from Angular. We will tell Angular to run this code before our routes are loaded so
    therefore it will give us the data for the arguments.
    CanActivate returns something. It either returns an observable that will either resolve to a true or false value; it will either return
    a promise that will either resolve to a boolean; or it will return just a boolean. This means that canActivate can run asynchronously,
    either returning an observable or a promise or synchronously.
     */
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authService.isAuthenticated()
        /* .then() indicates when Promise has resolved.
         */
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;
                    } else {
                        /* If user has not been authenticated, we want the user to be navigated away from the url that he or she has no
                        right to access. In this case we navigate the user back to the home page.
                         */
                        this.router.navigate(['/']);
                        return false;
                    }
                }
            )
    }
}