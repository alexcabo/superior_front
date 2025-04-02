import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private apiUrl = 'http://127.0.0.1:8000/api/v2/usuario'; // URL de la API para obtener todos los países
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
      return this.http.put(this.apiUrl + '/' + id , data, {headers});
  }

  getList(tipo: string): Observable<any> {
    const headers = this.headers;
      return this.http.get(this.apiUrl + '/rol/' + tipo, {headers});
  }

  delete(id: number): Observable<any> {
    const headers = this.headers;
      return this.http.delete(this.apiUrl + '/' + id, {headers});
  }

}
