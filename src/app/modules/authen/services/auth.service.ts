import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthenticationService, private router: Router) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.getCurrentUser()) {
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.getCurrentUser()) {
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }


}
