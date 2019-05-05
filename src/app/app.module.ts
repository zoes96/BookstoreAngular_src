import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService} from "./shared/book-store.service";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BookFormComponent } from './book-form/book-form.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthService } from "./shared/authentication-service";
import { TokenInterceptorService } from "./shared/token-interceptor.service";
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AdministrationComponent } from './administration/administration.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { UserComponent } from './user/user.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
    // hier werden alle benötigten Componenten deklariert
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    LoginComponent,
    CartComponent,
    MyOrdersComponent,
    CartListItemComponent,
    OrderListComponent,
    AdministrationComponent,
    OrderListItemComponent,
    UserComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [
      BookStoreService, AuthService, {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
