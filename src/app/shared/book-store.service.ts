import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {Author, Book, Image} from "./book";
import {Order} from "./order";
import {State} from "./state";
import {forEach} from "@angular/router/src/utils/collection";
import {User} from "./user";
import {UserOrder} from "./user-order";
import {AdminOrder} from "./admin-order";
import {DetailOrder} from "./detail-order";
import {StateEdit} from "./state-edit";

interface Tax{
    tax: number;
}

@Injectable()
export class BookStoreService {

    private api = 'http://bookstore19.s1610456032.student.kwmhgb.at/api';

    //books : Observable<Array<Book>>;
    //book : Book[];

  constructor(private http: HttpClient) {}

  public setBookTitles(){
        if(localStorage.getItem('books'))
            delete localStorage['books'];

        this.http.get(`${this.api}/books`).pipe(retry(3)).subscribe(res =>{
            let books = [];
            for(let key in res){
                books[res[key].id] = res[key];
            }
            localStorage.setItem('books', JSON.stringify(books));
        });
    }


    getAll() : Observable<Array<Book>> {
      return this.http.get(`${this.api}/books`)
          .pipe(retry(3))
          .pipe(catchError(this.errorHandler));

  }

    getSingle(isbn:string):Observable<Book> {
        return this.http.get(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    create(book:Book):Observable<any> {
        return this.http.post(`${this.api}/book`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    update(book:Book):Observable<any> {
        return this.http.put(`${this.api}/book/${book.isbn}`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    remove(isbn:string):Observable<any> {
        return this.http.delete(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }


    createOrder(order:Order):Observable<any> {
        return this.http.post(`${this.api}/cart`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getCart() {
        let books = [];
        let cart = JSON.parse(localStorage.getItem('cart'));
        let isbns = Object.keys(cart); // macht Array mit isbns
        // über Schleife einzelne Bücher holen und zum books-Array hinzufügen
        for(let i=0; i<isbns.length; i++){
            this.getSingle(isbns[i]).subscribe(res => books.push(res));
        }
        return books;
    }

    removeItemFromCart(isbn: string){
        let cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[isbn];
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    addToCart(isbn: string){
        let cart = JSON.parse(localStorage.getItem('cart'));

        // check if cart exists and create new if not
        if(!cart)
            cart = {};
        // check if isbn already exists and create new field with amount 1 if not
        if(!cart[isbn])
            cart[isbn] = {
            ['amount'] : 1,
            ['price'] : document.getElementById(isbn).getElementsByClassName('price')[0].innerHTML
        };
        // if already exists, increase amount
        else cart[isbn].amount++;

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    changeAmount(isbn: string) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[isbn].amount = Number(document.getElementById(isbn).getElementsByTagName('input')[0].value);

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getAllOrders() : Observable<Array<User>> {
        return this.http.get(`${this.api}/orders`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    getOrdersForUser() : Observable<Array<UserOrder>> {
        return this.http.get(`${this.api}/myOrders`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    orderDetail(id) : Observable<DetailOrder> {
        return this.http.get(`${this.api}/order/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    updateState(state: StateEdit) : Observable<any> {
        return this.http.put(`${this.api}/order/${state.order_id}`, state)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getTax(adress_id:number):Observable<Tax> {
        return this.http.get(`${this.api}/tax/${adress_id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }


  private errorHandler ( error:Error | any) : Observable<any> {
      return throwError(error);
  }
}
