import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    /**
     * Constructor de la clase.
     * @param http HttpClient
     */
    constructor(private http: HttpClient) { }

    /**
     * Obtiene todos los usuarios.
     */
    getUsuarios() {
        return this.http.get(`${environment.apiBaseUrl}/usuarios`);
    }

    /**
     * Obtiene un usuario específico.
     * @param id number
     */
    getUsuarioById(id: number) {
        return this.http.get(`${environment.apiBaseUrl}/usuarios/${id}`);
    }

    /**
     * Comprueba la existencia del usuario.
     * @param correo string
     * @param id number
     */
    uniqueEmail(correo: string, id?: number) {
        return this.http.get(`${environment.apiBaseUrl}/usuarios/correo/${correo}/${id}`);
    }

    /**
     * Registra un nuevo usuario.
     * @param usuario Usuario
     */
    createUsuario(usuario: Usuario) {
        return this.http.post(`${environment.apiBaseUrl}/usuarios`, usuario);
    }

    /**
     * Actualiza un usuario.
     * @param id number
     * @param usuario Usuario
     */
    updateUsuario(id: number, usuario: Usuario) {
        return this.http.put(`${environment.apiBaseUrl}/usuarios/${id}`, usuario);
    }

    /**
     * Habilita un usuario.
     * @param id number
     * @param usuario Usuario
     */
    updateEstadoUsuario(id: number, usuario: Usuario) {
        return this.http.patch(`${environment.apiBaseUrl}/usuarios/${id}`, usuario);
    }

    /**
     * Deshabilita un usuario.
     * @param id string
     * @param usuario Usuario
     */
    disableUsuario(id: string, usuario: Usuario) {
        return this.http.patch(`${environment.apiBaseUrl}/usuarios/${id}`, usuario);
    }
}
