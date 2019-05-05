import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'a.bs-book-list-item', // a definiert, dass es eine Klasse ist
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book; // um book von außen hier reinzuholen, muss mit input definiert werden, damit das Buch rein darf

  constructor() { }

  ngOnInit() {
  }

}
