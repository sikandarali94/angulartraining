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

  constructor(private accountsService: AccountService) {}

  /* Most initializations should not be done in the constructor but instead in ngOnInit
  lifecycle hook.
   */
  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}
