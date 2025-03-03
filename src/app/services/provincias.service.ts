import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
  private apiUrl = 'http://127.0.0.1:8000/api/v2/provincia'; // URL de la API para obtener todos los países
  private headers =  new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  // Inyectamos HttpClient directamente
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token')
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  add(data: any): Observable<any> {
    const headers = this.headers;
    return this.http.post(this.apiUrl, data, {headers});
  }

  update(id: number, data: any): Observable<any> {
      const headers = this.headers;
      return this.http.put(this.apiUrl + '/' + id + '/edit', data, {headers});
  }

  getList(): Observable<any> {
    const headers = this.headers;
      return this.http.get(this.apiUrl, {headers});
  }

  delete(id: number): Observable<any> {
    const headers = this.headers;
      return this.http.delete(this.apiUrl + '/' + id + '/delete', {headers});
  }
}
