import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = `${environment.apiUrl}/auth/login`;
  private apiUrl = 'http://127.0.0.1:8000/api/v1/auth';
  private apiKey = 'bWmS?&H?U@VGUEwe*%!A;e!A-L-E.'; // La API Key que te pasaron

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    let json = JSON.stringify([email, password]);
    return this.http.post(`${this.apiUrl}/login`, json).pipe(
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
  
  // private token: string | null = null;

  // constructor(private http: HttpClient) {}

  // // Método para hacer login
  // login(email: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: this.apiKey, // Incluimos la API Key en los headers
  //   });

  //   const body = { email, password };
  //   return this.http
  //     .post<{ token: string }>(this.apiUrl, body, { headers })
  //     .pipe(
  //       tap((response) => {
  //         // Guardamos el token en una variable local o en el almacenamiento local (localStorage)
  //         this.token = response.token;
  //         localStorage.setItem('authToken', this.token);
  //       })
  //     );
  // }

  // // Método para obtener el token
  // getToken(): string | null {
  //   const storedToken = this.token || localStorage.getItem('authToken');
  //   return storedToken;
  // }

  // // Método para cerrar sesión
  // logout(): void {
  //   localStorage.removeItem('authToken');
  // }
}
