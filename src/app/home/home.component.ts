import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `<div id="home"><h1>Willkommen in Zoe's Bücherladen!</h1>`+
  `<div [routerLink]="'/books'" class="ui large olive fade animated button home" tabindex="0">`+
      `<div class="visible content">Zum Bücherladen</div>`+
      `<div class="hidden content">`+
          `<i class="right arrow icon"></i>`+
      `</div>`+
  `</div></div>`,

  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
