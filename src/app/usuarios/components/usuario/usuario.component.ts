import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import Swal from 'sweetalert2';
import { moltenAnimation } from '../../../shared';

/**
 * Services.
 */
import { UsuarioService } from '../../services';
import { getSpanishPaginatorIntl } from '../../../shared';

/**
 * Models.
 */
import { Usuario } from '../../models';

/**
 * Interfaces.
 */
import { UsuarioInterface } from '../../interfaces';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [moltenAnimation]
})
export class UsuarioComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    /**
     * Campos privados.
     */
    private query: Subscription;

    /**
     * Campos públicos
     */
    public usuarios: Array<Usuario>;
    public count: number;
    public dataSource: MatTableDataSource<Usuario>;
    public displayedColumns: Array<string>;

    /**
     * Constructor de la clase.
     * @param _usuarioService UsuarioService
     * @param breakpointObserver BreakpointObserver
     */
    constructor(private _usuarioService: UsuarioService, public breakpointObserver: BreakpointObserver) {
        this.count = 0;
        this.breakpointObserver.observe(['(max-width: 1120px)']).subscribe(result => {
            this.displayedColumns = result.matches ? 
            ['nombre', 'correo', 'tipo_usuario.descripcion', 'tipo_cliente.descripcion', 'estado', 'acciones'] : 
            ['nombre', 'correo', 'tipo_usuario.descripcion', 'tipo_cliente.descripcion', 'estado', 'acciones'];
        });
    }

    /**
     * Método de inicio.
     */
    ngOnInit() {
        this.paginator._intl = getSpanishPaginatorIntl();
        this.getusuarios();
    }

    /**
     * Obtiene los usuarios.
     * @return Listado de usuarios.
     */
    private getusuarios() {
        this.query = this._usuarioService.getUsuarios().subscribe(
            (response: any) => {
                if (response.usuarios) {
                    this.usuarios = response.usuarios;
                    this.count = this.usuarios.length;
                    this.dataSource = new MatTableDataSource(this.usuarios);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            }, error => {
                console.log(<any>error);
            }
        );
    }

    /**
     * Habilita un usuario.
     */
    public enableUsuario(usuario: Usuario) : void {
        Swal.fire({
            html: "¿Está seguro que desea habilitar al siguiente usuario?<br>" + `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1e88e5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, habilitar',
            cancelButtonText: 'No, cancelar',
            allowEnterKey: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                const estado = {
                    estado: true
                };

                this._usuarioService.updateEstadoUsuario(usuario.id, estado).subscribe(
                    response => {
                        this.getusuarios();
                        Swal.fire({
                            type: 'success',
                            text: 'Usuario habilitado correctamente',
                            confirmButtonColor: '#1e88e5',
                            confirmButtonText: 'Aceptar',
                            allowEnterKey: false,
                            allowOutsideClick: false
                        })
                    },
                    error => {
                        console.log(<any>error);
                        Swal.fire({
                            type: 'error',
                            text: 'Error al habilitar al usuario. Por favor, intente nuevamente',
                            confirmButtonColor: '#1e88e5',
                            confirmButtonText: 'Aceptar',
                            allowEnterKey: false,
                            allowOutsideClick: false
                        })
                    }
                );
            }
        });
    }

    /**
     * Deshabilita un usuario.
     */
    public disableUsuario(usuario: Usuario) : void {
        Swal.fire({
            html: "¿Está seguro que desea bloquear al siguiente usuario?<br>" + `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1e88e5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bloquear',
            cancelButtonText: 'No, cancelar',
            allowEnterKey: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                const estado = {
                    estado: false
                };

                this._usuarioService.updateEstadoUsuario(usuario.id, estado).subscribe(
                    response => {
                        this.getusuarios();
                        Swal.fire({
                            type: 'success',
                            text: 'Usuario bloqueado correctamente',
                            confirmButtonColor: '#1e88e5',
                            confirmButtonText: 'Aceptar',
                            allowEnterKey: false,
                            allowOutsideClick: false
                        })
                    },
                    error => {
                        console.log(<any>error);
                        Swal.fire({
                            type: 'error',
                            text: 'Error al bloquear al usuario. Por favor, intente nuevamente',
                            confirmButtonColor: '#1e88e5',
                            confirmButtonText: 'Aceptar',
                            allowEnterKey: false,
                            allowOutsideClick: false
                        })
                    }
                );
            }
        });
    }

    /**
     * Search.
     */
    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    /**
     * Método destructor de la clase.
     */
    ngOnDestroy() {
        this.query.unsubscribe();
    }
}
