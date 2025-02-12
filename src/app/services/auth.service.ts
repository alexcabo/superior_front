import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuario/login`;
  private apiKey = 'bWmS?&H?U@VGUEwe*%!A;e!A-L-E.'; // La API Key que te pasaron
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  // Método para hacer login
  login(documento: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.apiKey, // Incluimos la API Key en los headers
    });

    const body = { documento, password };
    return this.http
      .post<{ token: string }>(this.apiUrl, body, { headers })
      .pipe(
        tap((response) => {
          // Guardamos el token en una variable local o en el almacenamiento local (localStorage)
          this.token = response.token;
          localStorage.setItem('authToken', this.token);
        })
      );
  }

  // Método para obtener el token
  getToken(): string | null {
    const storedToken = this.token || localStorage.getItem('authToken');
    return storedToken;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
