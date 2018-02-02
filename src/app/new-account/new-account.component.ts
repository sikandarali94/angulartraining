import { Component } from '@angular/core';
/* We must first import our services before we can inject them into our component for use.
 */
import {LoggingService} from '../logging.service';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  /* In providers we specify the type of what we want to be able to get provided. So,
  in this case we specify LoggingService again. With this Angular when analyzing the
  component recognises that it should be able to give us a LoggingService and it will
  set itself up to be able to do so. And when Angular actually constructs the component
  it sees we want to have such an instance of and it will know how to give us such an
  instance.
   */
  /* If we want to use the instance of the service in our app component we simply remove
  AccountsService from the providers list as we have done below. However, it is important
  we don't remove AccountService from our constructor.
   */
  // providers: [LoggingService]
})
export class NewAccountComponent {

  /* We can name our dependency whatever we like. In this case we name it loggingService.
  However we cannot name our type whatever we like. We have to provide the exact name
  of the Service we want injected into our component. This tells Angular that new-account
  component depends on the LoggingService to function and thus Angular constructs the
  component in such a way that it creates an instance of the service for the component.
  The last thing we need to tell Angular is how to give us such an instance of
  LoggingService in this component.
   */
  constructor(private loggingService: LoggingService, private accountsService: AccountService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    /* We want to create a service that can log data.
     */
    /* The reason it is better to use this method of creating an instance of our service
    rather than doing it by using the new keyword manually is that allows us to stay in
    the Angular ecosystem where Angular knows how our app works. There are other advantages
    we will encounter as we use Angular more.
     */
    // this.loggingService.logStatusChange(accountStatus);
  }
}
