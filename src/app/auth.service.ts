/* This is just a fake service, imitating whether the user has been authenticated or not.
 */

export class AuthService {
    loggedIn = false;

    isAuthenticated() {
        /* We are just faking here to say that it takes 800 milliseconds for the authentication to happen.
         */
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    /* Since we are passing to this promise false, the guard will never give us access to the route it is placed on.
                     */
                    resolve(this.loggedIn);
                }, 800);
            }
        );
        return promise;
    }

    /* Since we implemented the login and logout methods using the buttons, this will change loggedIn to true when user has clicked Log In
    button (and thus true will be passed to the promise) or will change loggedIn to false when user has clicked Log Off (and thus false will
    be passed to the promise).
     */
    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}