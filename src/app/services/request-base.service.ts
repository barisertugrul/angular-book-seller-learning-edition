import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class RequestBaseService {

  protected currentUser: User = new User;

  constructor(
    protected authenticationService:AuthenticationService,
    protected http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    })
  }

  get getHeaders() : HttpHeaders {
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.token,
        "Content-Type": "application/json; charset=UTF-8"
      }
    );
  }
}
