import { AuthenticationService } from './../services/authentication.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private currentUser: User = new User;

  constructor(private authentiactionService:AuthenticationService, private router:Router){
    this.authentiactionService.currentUser.subscribe( data => {
      this.currentUser = data;
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.currentUser){
        if (route.data.roles?.indexOf(this.currentUser.role) === -1){
          this.router.navigate(['/401']);
          return false;
        }
        return true;
      }
    this.router.navigate(['/login']);
    return true;
  }

}
