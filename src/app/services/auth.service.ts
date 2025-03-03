import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getAuthToken() {
    throw new Error('Method not implemented.');
  }
  //private apiUrl = `${environment.apiUrl}/auth/login`;
  private apiUrl = 'http://127.0.0.1:8000/api/v2';
  //private apiKey = 'bWmS?&H?U@VGUEwe*%!A;e!A-L-E.'; // La API Key que te pasaron

  constructor(private http: HttpClient, private router: Router) {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  }

  login(email: string, password: string): Observable<any> {
    let credential = {'email': email, 'password': password};

    return this.http.post(`${this.apiUrl}/login`, credential).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}