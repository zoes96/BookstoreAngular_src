import {Component, Input, OnInit} from '@angular/core';
import {UserOrder} from "../shared/user-order";
import {Router} from "@angular/router";

@Component({
  selector: 'a.bs-order-list-item',
  templateUrl: './order-list-item.component.html',
  styles: []
})
export class OrderListItemComponent implements OnInit {

  @Input() order: UserOrder;
  books : [];

  constructor(private router : Router) { }

  ngOnInit() {
      this.books = JSON.parse(localStorage.getItem('books'));
  }

    editOrder(id){
        this.router.navigateByUrl('/order/'+id);
    }
}
