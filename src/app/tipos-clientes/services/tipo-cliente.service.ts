import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipoClienteService {

    /**
     * Constructor de la clase.
     * @param http HttpClient
     */
    constructor(private http: HttpClient) { }

    /**
     * Obtiene todos los tipos de clientes.
     */
    getClientes() {
        return this.http.get(`${environment.apiBaseUrl}/tiposclientes`);
    }
}
