import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../api_urls/job_seeker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  role: "job_seeker";
}

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient, private router: Router) {}

  loginService(loginObj: any, redirectUrl?: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(apiUrl.AuthServiceApiLogin, loginObj).pipe(
      tap((res: AuthResponse) => {
        this.setSession(res);
        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
        } else {
          this.router.navigate(['/job_seeker_home']);
        }
      })
    );
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem('user_role', authResult.role); 
    this.tokenSubject.next(authResult.access_token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRole(): string | null {
    return localStorage.getItem('user_role'); 
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role'); 
    this.tokenSubject.next(null);
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); 
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Add Authorization header if token is available
    }
  
    return headers;
  }

  loginWithGoogle(token: string) {
    const payload = { token: token };
    return this.http.post('http://127.0.0.1:8000/api/V1/auth/google-login/', payload);
  }
  
}