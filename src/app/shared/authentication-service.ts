import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';
import {BookStoreService} from "./book-store.service";
import {Router} from "@angular/router";

//npm install --save-dev jwt-decode

interface User {
    result: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        isAdmin: boolean,
        adress_id: number,
        created_at: Date,
        updated_at: Date
    }
}

@Injectable()
export class AuthService {

    private api:string = 'http://bookstore19.s1610456032.student.kwmhgb.at/api/auth';//'http://localhost:8080/api/auth';

    constructor(
        private http: HttpClient,
        private bs: BookStoreService,
        private router : Router
    ) {}

    public login(email: string, password: string ) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public redirectFromForbiddenPage(){
        if(this.isLoggedIn() && this.checkIfAdmin())
            this.router.navigateByUrl('/administration');
        else if(this.isLoggedIn() && !this.checkIfAdmin())
            this.router.navigateByUrl('/myOrders');
        else this.router.navigateByUrl('/login');
    }

    public checkIfAdmin(){
        return (localStorage.getItem('isAdmin') == '1');
    }

    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log(decodedToken.user.id);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('isAdmin', decodedToken.user.isAdmin);

        this.setCurrentUserInformation();
        this.bs.setBookTitles();
    }

    // holt die übrigen Informationen vom Server
    public setCurrentUserInformation(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{

            //im Local Storage dürfen nur Strings gespeichert werden
            let userInformation = {
                ['id'] : res.result.id,
                ['isAdmin'] : res.result.isAdmin,
                ['firstName'] : res.result.firstName.toString(),
                ['lastName'] : res.result.lastName.toString(),
                ['adress_id'] : res.result.adress_id,
                ['email'] : res.result.email
            };

            localStorage.setItem('userInfo', JSON.stringify(userInformation));
            }
        );
    }

    public logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("isAdmin");
        console.log("logged out");
    }

    /*
    public isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem("token"));
    }
    */
    public isLoggedIn() {
        if(!isNullOrUndefined(localStorage.getItem("token"))){
            let token : string  = localStorage.getItem("token");
            const decodedToken = decode(token);
            let expirationDate:Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if(expirationDate < new Date()){
                console.log("token expired");
                localStorage.removeItem("token");
                return false;
            }
            return true;
        } else {
            return false;
        }
    }


    isLoggedOut() {
        return !this.isLoggedIn();
    }

}


/*
import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "util";
import { HttpClient } from "@angular/common/http";
import * as decode from 'jwt-decode';
import { retry } from "rxjs/operators";

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        updated_at: Date
    }
}

@Injectable()
export class AuthService {
    private api = 'http://bookstore19.s1610456032.student.kwmhgb.at/api';

    constructor (private http: HttpClient) {}

    login (email:string, password:string) {
        return this.http.post(`${this.api}/login`, {
            'email' : email,
            'password' : password
        });
    }

    // setzt voraus, dass wie eingeloggt sind und gültigen Token mitschicken
    public setCurrentUserId () {
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
            localStorage.setItem('userId', res.result.id.toString());
        })
    }

    // aus Local Storage aktuelle UserID auslesen
    public  getCurrentUserId () {
        return Number.parseInt(localStorage.getItem('userId'));
    }
}
*/