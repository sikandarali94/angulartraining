/* The Subject object of RxJS basically is like an Observable but it allows us to conveniently push it to emit a new data during our code.
 */
/* Subject object should be imported from 'rxjs/Rx' before we can use it in our TypeScript file.
 */
import {Subject} from 'rxjs/Rx';

export class UsersService {
    userActivated = new Subject();
}