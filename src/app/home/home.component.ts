import { Component, OnInit } from '@angular/core';
// Router needs to imported from '@angular/router' before we can use it in our component.
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServer(id: number) {
    /*
    navigate method allows us to navigate to a new path. It takes in an an array and we define to which path
    we want to navigate to, as we have done below.
    */
    /* Below is how we change the URL programatically that has query parameters and fragments.
     */
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

}
