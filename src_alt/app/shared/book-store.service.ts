import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import { catchError, retry} from "rxjs/internal/operators";
import {Book, Author, Image} from "./book";

/*
@Injectable({ // ich muss mich um Abhängigkeiten und Erzeugung von Instanzen nicht selber kümmern, funktioniert automatisch
  providedIn: 'root'
})
*/
export class BookStoreService {
    private api = 'http://bookstore19.s1610456032.student.kwmhgb.at/api';

  //books : Book[];

  constructor(private http:HttpClient) {

      /*
      this.books = [
          new Book(1,
              '9783864903571',
              'Angular',
              [new Author(1,'Johannes', 'Hoppe'), new Author(2,'Danny','Koppenhagen'),
                  new Author(3,'Ferdinand','Malcher'), new Author(4,'Gregor', 'Woiwode')],
              new Date(2017, 3, 1),
              1,
              'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
              5,
              [new Image(1,'https://ng-buch.de/cover2.jpg', 'Buchcover')],
              'Mit Angular setzen Sie auf ein modernes und modulares...'
          ),
          new Book(2,
              '9783864901546',
              'AngularJS',
              [new Author(5,'Philipp', 'Tarasiewicz'),new Author(6,'Robin', 'Böhm')],
              new Date(2014, 5, 29),
              1,
              'Eine praktische Einführung',
              5,
              [new Image(2,'https://ng-buch.de/cover1.jpg', 'Buchcover')],
              'Dieses Buch führt Sie anhand eines zusammenhängenden Beispielprojekts...'
          )
      ];
      */
  }
    getAll():Observable<Array<Book>>{
        return this.http.get(`${this.api}/books`) // Achtung auf ''
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
        //return this.books;
    }

    getSingle(isbn:string):Observable<Book> {
        return this.http.get(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    /*
    getSingle (isbn:string):Book{
        return this.books.find(book => book.isbn === isbn);
    }*/

    private errorHandler (error:Error|any): Observable<any>{
      return throwError(error);
    }
}
