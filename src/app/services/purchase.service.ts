import { Observable } from 'rxjs';
import { Purchase } from './../models/purchase.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestBaseService } from './request-base.service';
import { HttpClient } from '@angular/common/http';

const API_URL = `${environment.BASE_URL}/api/purchase-history`
@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService {

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
   }

  savePurchase(purchase: Purchase):Observable<any>{
    return this.http.post(API_URL, purchase, {headers:this.getHeaders});
  }

  getAllPurchaseItems(): Observable<any>{
    return this.http.get(API_URL, {headers: this.getHeaders});
  }
}
