import { Component, OnInit } from '@angular/core';
import {BookStoreService} from "../shared/book-store.service";
import {User} from "../shared/user";
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'bs-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  users : User[];

  constructor(private bs : BookStoreService, private authService : AuthService) { }

  ngOnInit() {
      if(this.authService.isLoggedIn() && this.authService.checkIfAdmin())
          this.bs.getAllOrders().subscribe(res => this.users = res);
      else
          this.authService.redirectFromForbiddenPage();
  }

}
