import { Injectable } from '@angular/core';
import { providerapiUrl } from '../../../../api_urls/job_provider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  role: "job_seeker";
  user_id:string;
}

@Injectable({
  providedIn: 'root'
})
 
export class ProvderLoginService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient, private router: Router) {}

  loginService(loginObj: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(providerapiUrl.AuthServiceApiLogin, loginObj).pipe(
      tap((res: AuthResponse) => {
        console.log(res)
        this.setSession(res);
      })
    );
  }

  private setSession(authResult: AuthResponse): void {
    console.log(authResult.user_id)
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem('user_role', authResult.role);
    localStorage.setItem('user_id',authResult.user_id) 
    this.tokenSubject.next(authResult.access_token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');  // Get the user role
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
    if (token) {
      return new HttpHeaders().set('Authorization', 'Bearer ${token}');
    }
    return new HttpHeaders();
  }

  loginWithGoogle(token: string) {
    const payload = { token: token };
    return this.http.post('http://127.0.0.1:8000/api/V1/auth/provider/google-login/', payload);
  }
}

