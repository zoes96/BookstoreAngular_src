import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'bs-administration',
  templateUrl: './administration.component.html',
  styles: []
})
export class AdministrationComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
      if(this.authService.isLoggedIn() && this.authService.checkIfAdmin()){}
      else
          this.authService.redirectFromForbiddenPage();
  }
}
