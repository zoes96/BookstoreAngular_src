import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {BookStoreService} from "../shared/book-store.service";
import {UserOrder} from "../shared/user-order";
import {AuthService} from "../shared/authentication-service";
import {Router} from "@angular/router";

@Component({
  selector: 'bs-my-orders',
  templateUrl: './my-orders.component.html',
  styles: []
})
export class MyOrdersComponent implements OnInit {

  orders : UserOrder[];

  constructor(private bs : BookStoreService, private authService : AuthService, private router : Router) { }

  ngOnInit() {
      if(this.authService.isLoggedIn() && !this.authService.checkIfAdmin())
          this.bs.getOrdersForUser().subscribe(res => this.orders = res);
      else
          this.authService.redirectFromForbiddenPage();
  }

}
