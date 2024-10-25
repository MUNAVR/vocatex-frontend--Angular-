import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve token (or user ID) from localStorage or sessionStorage
    const token = localStorage.getItem('authToken'); // Ensure 'authToken' is set after login

    if (token) {
      // Clone the request and add the Authorization header
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Attaching the token
        }
      });
      return next.handle(clonedReq);  // Pass the cloned request to the next handler
    } else {
      // If no token, proceed with the original request
      return next.handle(req);
    }
  }
}
