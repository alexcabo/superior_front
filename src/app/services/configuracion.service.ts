import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private apiUrl = `${environment.apiUrl}/config`;
  constructor(private http: HttpClient) {}

  obtenerConfiguraciones(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }
  actualizarConfiguracion(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}/1`, data);
  }
}
