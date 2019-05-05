import { Component } from '@angular/core';
import { Book } from './shared/book';
import {AuthService} from "./shared/authentication-service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
  constructor (private authService:AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  checkIfAdmin() {
    return this.authService.checkIfAdmin();
  }

  getLoginLabel() {
    if(this.isLoggedIn()) {
      return "Logout";
    }
    return "Login";
  }
}
