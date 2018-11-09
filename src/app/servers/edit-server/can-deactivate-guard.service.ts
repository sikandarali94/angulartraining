/* Here we are importing an interface. An interface simply is a contract which can be imported by some other class which
forces those classes to provide some logic.
 */
import {Observable} from 'rxjs/Observable';
/* We need to import CanDeactivate from '@angular/router' before we can use it in our TypeScript class.
 */
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';

export interface CanComponentDeactivate {
    /* Whichever component has this interface implemented on it should have the canDeactivate method. This is what the canDeactivate line
    is saying here. We are forcing a class to provide logic, so in the interface here we do not provide the logic only on what the
    canDeactivate method in the components should look like. So we are saying here is that the component which has this interface
    implemented should have canDeactivate method that takes in no arguments but should return either an observable that resolves to
    boolean, or return a promise that resolves to a boolean, or simply return a boolean.
     */
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/*
CanDeactivate is not the canDeactivate that we defined in the CanComponentDeactivate interface but is an interface provided by the Angular
router. This is actually a generic type (hence the <>) and it will wrap our own interface. So CanDeactivate will wrap an interface which
forces some component or some class to implement the canDeactivate method (hence why we wrote CanComponentDeactivate). It might sound
complicated but this is the setup which will make sure that we later can easily connect a component to our CanDeactivateGuard here.
 */
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    /* We are implementing the CanComponentDeactivate interface here so, according to that interface, we must have a canDeactivate method
    in the class here. This canDeactivate() method here will be called by the Angular router once we try to leave a route.
     */
    /*
    canDeactivate will receive the component on which we are currently on. The component must be of type CanComponentDeactivate, meaning
    it must have the canDeactivate method. canDeactivate will also receive data about the current route. canDeactivate will also receive
    data about the current state of the route. The nextState is information about where the user wants to go and will be information
    passed to the canDeactivate method here. However, nextState is an optional argument, hence we place a question mark next to the colon
    (?:).
     */
    canDeactivate(component: CanComponentDeactivate,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        /* We want to call the canDeactivate method of the component we are currently on. This is why we need to implement the interface
        in the component and why we created the interface in the first place. Now the Angular router can execute canDeactivate in our
        service here and can rely on the fact that the component we are currently on has the canDeactivate method too because the
        canDeactivate in the component is where we actually implement the logic to check whether we are allowed to leave or not.
         */
        return component.canDeactivate();
    }
}