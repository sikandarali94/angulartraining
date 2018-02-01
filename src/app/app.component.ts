import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService]
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  /* Here we created an instance of an AccountService but we then created another instance
  of the AccountService in our new account component. The AccountService in our new account
  component has its own instance and so any changes to that AccountService will not be changed
  here because it is a different instance. This is because Angular uses a Hierarchical Injection.
  This means that if we provide a service in some place within our app, let's say one component,
  the Angular framework knows how to create an instance of that service for this component and
  importantly for all its child components. So this component and all its child components and
  the child components of that child component and so forth will receive the same instance of
  the service. Therefore if we provide a service to the app module, which is the highest
  component after the app module, the instance of that service will be available to all other
  components because they are the child and grandchild and so forth of the app module. In this
  case if we create another instance of the same service in our child component that instance
  will not be available in the parent component and thus this is why the changes happening in the
  service of the new account component are not affecting the changes in the service of our app
  component because it is of a different instance.
   */
  constructor(private accountsService: AccountService) {}

  /* Most initializations should not be done in the constructor but instead in ngOnInit
  lifecycle hook.
   */
  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}
