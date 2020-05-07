import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService : LoginService, private router:Router, private jwtHelperService: JwtHelperService)
   { 

   }

  canActivate(route:ActivatedRouteSnapshot): boolean{
    var token = sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")).token : null;
    if (this.loginService.isAuthenticated() && this.jwtHelperService.decodeToken(token).role==route.data.expectedRole){
      return true;
    }
    else{
      this.router.navigate(["login"]);
      return false;
    }
  }
}
