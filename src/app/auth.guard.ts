import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router,private Auth:AuthService) {}

  canActivate(): boolean {
    if (this.Auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
