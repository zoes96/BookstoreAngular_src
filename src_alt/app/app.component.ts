import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bs-root',
  //template: '<bs-book-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-book-list><bs-book-details *ngIf="detailsOn" [book]="book" (showListEvent)="showList()"></bs-book-details>',
  //template: '<bs-book-list></bs-book-list>',
  templateUrl: './app.component.html', // hier könnte auch ein Inline-Template eingebunden werden, das ist aber für komplexe Anwendungen nicht sehr zielführend
  styles: [] // braucht man nicht
})

// hier wird nur mehr der Platzhalter definiert, es wird dann hineingeladen, was in der Route aufgerufen wird
export class AppComponent {



  /*
  listOn = true;
  detailsOn = false;

  book:Book;

  showDetails(bookFromEvent:Book){
    console.log("details event...");
    this.book = bookFromEvent;
    this.detailsOn = true;
    this.listOn = false;
  }

  showList(){
      console.log("back to list...");
      this.detailsOn = false;
      this.listOn = true;
  }

  /*
  title = 'bookstore19';
  person = {
    name : "Zoe"
  };
  myUrl = "http://www.orf.at";

  myClickhandler(){
    console.log("clicked");
    this.title = "Bookstore Clicked"
  }
  */
}
