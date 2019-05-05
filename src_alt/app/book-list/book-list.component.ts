import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book, Image, Author } from '../shared/book';
import { BookStoreService } from "../shared/book-store.service";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {
    books : Book[];
    @Output() showDetailsEvent = new EventEmitter<Book>(); // Eventhandler registrieren, Komoponente kann das Event nach außen hin zur Verfügung stellen

    constructor(private bs : BookStoreService) { } // stellt in der Klasse automatisch eine Instanz von BookStoreService unter this.bs zur Verfügung (über Dependency Injection)


    // ngOnInit - wird automatisch gefeuert, wenn die Komponente in der View geladen wird; bastelt Logik der Komponente
    ngOnInit() {
        //this.books = this.bs.getAll();
        this.bs.getAll().subscribe(
            res => this.books = res
        )
    }

    /*
  showDetails(book:Book){
      console.log(book);
      // Event feuern
      this.showDetailsEvent.emit(book);
  }
  */

}
