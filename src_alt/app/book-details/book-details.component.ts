import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core'; // EventEmitter brauche ich jetzt eigentlich nicht mehr, da es über die Routes funktioniert
import { Book } from '../shared/book';
import { ActivatedRoute} from "@angular/router";
import { BookStoreService} from "../shared/book-store.service";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {
    @Input() book: Book; // um book von außen hier reinzuholen, muss mit input definiert werden, damit das Buch rein darf
    @Output() showListEvent = new EventEmitter<any>();

    constructor(
        private bs:BookStoreService,
        private route:ActivatedRoute
    ) { }

  ngOnInit() {
        // route in einzelne Bestandteile zerlegen
        const params = this.route.snapshot.params;
        //this.book = this.bs.getSingle(params['isbn']);
  }

  /*
  showBookList(){
      console.log("back to booklist...");
      this.showListEvent.emit();
  }
  */

  // Hilfsfunkton für Rating
  getRating(num:number) {
      return new Array(num);
  }

}
