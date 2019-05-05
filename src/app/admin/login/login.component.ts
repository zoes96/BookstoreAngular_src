import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/authentication-service";

interface Response {
  response: string;
  result: {
    token: string;
  }
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });
  }

  // wenn ich im Formular auf abschicken klicke:
  login() {
    const val = this.loginForm.value;
    if(val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(res => {
        const resObj = res as Response; // muss dem Interface entsprechen
          if(resObj.response === 'success') {
              this.authService.setLocalStorage(resObj.result.token); // Token wegspeichern
              if(localStorage.getItem('loginForOrder')) {
                this.router.navigateByUrl('/cart');
                delete localStorage['loginForOrder'];
              }
              else {
                if(JSON.parse(localStorage.getItem('userInfo'))){
                    if(JSON.parse(localStorage.getItem('userInfo'))['isAdmin'] == 1)
                        this.router.navigateByUrl('/administration');
                    else
                        this.router.navigateByUrl('/myOrders');
                }
                else
                    this.router.navigateByUrl('/myOrders');
              }
          }
      })
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() { this.router.navigateByUrl(('/'));
    return this.authService.logout();
  }

}
