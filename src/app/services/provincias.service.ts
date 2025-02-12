import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/provincias'; // URL de la API para obtener todos los países

  // Inyectamos HttpClient directamente
  constructor(private http: HttpClient) {}

  add(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
      return this.http.put(this.apiUrl + '/' + id + '/edit', data);
  }

  getList(): Observable<any> {
      return this.http.get(this.apiUrl);
  }

  delete(id: number): Observable<any> {
      return this.http.delete(this.apiUrl + '/' + id + '/delete');
  }
}
