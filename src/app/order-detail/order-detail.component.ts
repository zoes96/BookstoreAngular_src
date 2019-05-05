import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookStoreService} from "../shared/book-store.service";
import {DetailOrder} from "../shared/detail-order";
import {StateEdit} from "../shared/state-edit";
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'bs-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {

  order : DetailOrder;
  statesLength : number;
  editing : boolean;
  history : boolean;
  id : number;

  constructor(
      private route : ActivatedRoute,
      private bs : BookStoreService,
      private authService : AuthService,
      private router : Router
  ) { }

  ngOnInit() {
      const params = this.route.snapshot.params;
      this.bs.orderDetail(params['id']).subscribe(res => {
        this.order = res;
        this.id = this.order.id;
        this.statesLength = this.order.states.length-1;
      });
      this.editing = false;
  }

  isAdmin(){
      return this.authService.checkIfAdmin();
  }

  editState(){
    this.editing = true;
  }

  saveState(){
    this.editing = false;
    let state = (<HTMLInputElement>document.getElementById('stateEditor')).value;
    let comment = (<HTMLInputElement>document.getElementById('stateComment')).value;

    let stateObject = new StateEdit(state, comment, this.id);
    this.bs.updateState(stateObject).subscribe();
    this.bs.orderDetail(this.id).subscribe(res => {
        this.order = res;
        this.id = this.order.id;
        this.statesLength = this.order.states.length - 1;
    });
  }

  cancel(){
    this.editing = false;
  }

  showHistory(){
    this.history = true;
  }

  hideHistory(){
    this.history = false;
  }

}
