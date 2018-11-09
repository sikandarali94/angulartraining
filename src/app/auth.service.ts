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

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}