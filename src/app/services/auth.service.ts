import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v2';  
  //private apiKey = 'bWmS?&H?U@VGUEwe*%!A;e!A-L-E.'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(documento: string, password: string): Observable<any> {

    const credential = { 'email': documento, 'password': password };

    // Definir los headers de la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.post(`${this.apiUrl}/login`, credential, { headers }).pipe(
      tap((response: any) => {
        // Si la respuesta contiene un token, lo guardamos en el localStorage
        if (response.token) {
          localStorage.setItem('access_token', response.token);
          this.router.navigate(['/dashboard']);
        } else {
          // Si no hay token, podemos manejar la respuesta de error o mostrar un mensaje
          localStorage.removeItem('access_token');
        }
      }),
      catchError((error) => {
        throw error;  // Propagar el error para que no se continúe con el flujo
      })
    );
  }

  logout() {
    // Eliminar el token de localStorage
    localStorage.removeItem('access_token');

    console.log(localStorage.getItem('access_token'));

    // Redirigir al login de manera absoluta
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está autenticado
  get loggedIn(): boolean {
    return !!localStorage.getItem('access_token'); // Devuelve true si hay un token en el localStorage
  }
}