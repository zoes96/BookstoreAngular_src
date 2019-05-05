import {Component, Input, OnInit} from '@angular/core';
import {User} from "../shared/user";
import {AdminOrder} from "../shared/admin-order";
import {BookStoreService} from "../shared/book-store.service";
import {State} from "../shared/state";
import {Router} from "@angular/router";

@Component({
  selector: 'a.bs-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  @Input() user : User;

  constructor(private bs : BookStoreService, private router : Router) { }

  ngOnInit() {
    console.log('in user');
    console.log(this.user);
  }

  editOrder(id){
    console.log("EDIT: ", id);
    this.router.navigateByUrl('/order/'+id);
  }

}
