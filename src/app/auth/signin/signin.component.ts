import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {TrySignin} from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    console.log('Success');
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignin({username: email, password: password}));
  }

}
