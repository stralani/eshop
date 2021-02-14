import { ShoppingCartService } from './../../../shopping-cart/services/shopping-cart.service';
import { User } from './../../../authen/models/user.model';
import { AuthenticationService } from './../../../authen/services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  user: User = {};
  numberOfItems = 0;

  constructor(private authenticationService: AuthenticationService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.authenticationService.onLogin$.subscribe(user => {
      this.user = user;
    });

    this.shoppingCartService.numberOfItems$.subscribe(numberOfItems => {
      this.numberOfItems = numberOfItems;
    });
  }

  logout() {
    this.authenticationService.firebaseLogout();
    this.user = {};
  }

}
