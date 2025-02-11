import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/paises'; // URL de la API para obtener todos los países

  paises: any[] = [];

  // Inyectamos HttpClient directamente
  constructor(private http: HttpClient) {}

  // Método para obtener la lista de países
  obtenerPaises(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  add(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
      return this.http.put(this.apiUrl + '/ ${ id }', data);
  }

  getList(): Observable<any> {
      return this.http.get(this.apiUrl);
  }

  delete(id: number): Observable<any> {
      return this.http.delete(this.apiUrl + '/ ${ id }');
  }
}
