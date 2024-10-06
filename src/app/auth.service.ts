import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Function to store the token (after successful login)
  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Decode the token
  getDecodedToken() {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Check if the token is expired
  isTokenExpired(): boolean {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      const currentTime = Math.floor(Date.now() / 1000);
      if(decodedToken.exp!=undefined){
        return decodedToken.exp < currentTime;
      }
      return true;
    }
    return true;
  }

  // Check if the user is logged in by validating the token
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(); // Token should not be expired
  }

  // Log out the user
  logout() {
    localStorage.removeItem('authToken');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();

    // Clone the request to add the authorization header if token is available
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
      return next.handle(clonedReq);
    }

    // If no token, proceed with the original request
    return next.handle(req);
  }
}
