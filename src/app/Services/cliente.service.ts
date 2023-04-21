import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../Entity/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  listarClientes(): Observable<any> {
    return this.http.get('http://147.182.191.37:8080/cliente/listar',
      { headers: { 'Content-Type': 'application/json' } });
  }

  crearCliente(cliente: Cliente): Observable<any> {
    let params = JSON.stringify(cliente);
    return this.http.post('http://147.182.191.37:8080/cliente',
      params, { headers: { 'Content-Type': 'application/json' } });
  }

  busquedaAvanzada(cliente: Cliente): Observable<any> {
    let params = JSON.stringify(cliente);
    return this.http.post('http://147.182.191.37:8080/cliente/advancedSearch',
      params, { headers: { 'Content-Type': 'application/json' } });
  }

  buscarCliente(key: string): Observable<any> {
    return this.http.get('http://147.182.191.37:8080/cliente?key=' + key,
      { headers: { 'Content-Type': 'application/json' } });
  }

  exportarCliente() {
    return this.http.get('http://147.182.191.37:8080/cliente/exportData',
      { responseType: 'blob' });

  }
}
