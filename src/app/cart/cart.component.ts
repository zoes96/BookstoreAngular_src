import {Component, Input, OnInit} from '@angular/core';
import { Book, Image, Author } from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";
import {Order} from "../shared/order";

import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";
import {OrderPosition} from "../shared/order-position";

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

    @Input() newOrder : Order;
    books : Book[] = [];

    netto: number = 0;
    tax: number;
    brutto: number = 0;
    userInfo;

    constructor(
        private bs : BookStoreService,
        private route : ActivatedRoute,
        private router : Router,
        private authService : AuthService,
    ) { }

    ngOnInit() {
        this.netto = 0;
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart){
            cart = {};
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        this.books = this.bs.getCart();

        if(this.isLoggedIn()){
            // get netto
            let isbns = Object.keys(cart);
            for(let isbn of isbns){
                let price = parseFloat(cart[isbn].price);
                let amount = parseFloat(cart[isbn].amount);
                this.netto += (price*amount);
            }

            // get tax
            let adress_id = JSON.parse(localStorage.getItem('userInfo'))['adress_id'];
            this.bs.getTax(adress_id).subscribe(res => {
                this.tax = res.tax;
            });

            // calculate brutto
            this.brutto = this.netto*(this.tax+100)/100;
        }
    }

    createOrder() {
        // check if user is logged in
        if (!this.authService.isLoggedIn()){
            this.redirectToLogin();
            return;
        }
        // create order
        if (confirm("Bestellung verbindlich abschicken?")) {
            if(this.books && this.books.length){
                // create order positions
                let orderPositions = [];
                for (let book of this.books){
                    orderPositions.push(new OrderPosition(book.amount, book.id, book.currentNetto));
                }
                // create order with order positions
                let order = new Order(orderPositions);
                // do request on server
                this.bs.createOrder(order)
                    .subscribe(res => this.router.navigate(['../books'], // navigate to bookstore after order
                        {relativeTo: this.route}
                    ));
                // remove cart from local storage
                delete localStorage['cart'];
            }
            else console.log("ERROR - not books to order");
        }
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    redirectToLogin(){
        //
        localStorage.setItem('loginForOrder', 'true');
        this.router.navigate(['../login'], {relativeTo: this.route});
    }
}
