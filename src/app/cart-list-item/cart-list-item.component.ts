import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'div.bs-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styles: []
})
export class CartListItemComponent implements OnInit {
    @Input() book : Book;
    myAmount: 0;

  constructor(private bs : BookStoreService, private cart : CartComponent) { }

  ngOnInit() {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (cart)
          this.book.amount = cart[this.book.isbn].amount;
  }

  removeItemFromCart(isbn: string) {
      if(confirm("Buch aus dem Warenkorb entfernen?")){
          this.bs.removeItemFromCart(isbn);
          this.cart.ngOnInit(); // Cart neu laden
      }
  }

  changeAmount(isbn: string) {
      this.bs.changeAmount(isbn);
      this.cart.ngOnInit(); // Cart neu laden
  }

}
