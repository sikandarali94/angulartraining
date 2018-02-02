import {LoggingService} from './logging.service';
/* We have to make sure to import the Injectable decorator from '@angular/core' before
we can use it in our Typescript file.
 */
import {EventEmitter, Injectable} from '@angular/core';

/* To inject a service within a service we need to have some metadata attached to it.
A component has some metadata because we have @Component. To add metadata so we can
inject a service into another service we use the @Injectable decorator. This
decorator tells Angular that this service is injectable, or, in other words something
can be injected in there. So we don't place @Injectable to the service we want to
inject but the service where where we want to inject into.
 */
@Injectable()
export class AccountService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];
    statusUpdated = new EventEmitter<string>();

    constructor(private loggingService: LoggingService) {}

    addAccount(name: string, status: string) {
        this.accounts.push({name: name, status: status});
        this.loggingService.logStatusChange(status);
    }

    updateStatus(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }

}
