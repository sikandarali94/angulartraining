/* The Subject object of RxJS basically is like an Observable but it allows us to conveniently push it to emit a new data during our code.
 */
/* Subject object should be imported from 'rxjs/Rx' before we can use it in our TypeScript file.
 */
/* Once we remove rxjs-compat, instead of importing from 'rxjs/Rx' we import from 'rxjs'. Otherwise our Angular app will fail to compile.
 */
import {Subject} from 'rxjs';

export class UsersService {
    userActivated = new Subject();
}