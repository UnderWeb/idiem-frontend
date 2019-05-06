import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TitleCasePipe, LowerCasePipe } from '@angular/common';
import { CustomValidators } from 'ng2-validation';
import Swal from 'sweetalert2';
import { moltenAnimation } from '../../../shared';

/**
 * Services.
 */
import { UsuarioService } from '../../services';
import { TipoUsuarioService } from '../../../tipos-usuarios';
import { TipoClienteService } from '../../../tipos-clientes';

/**
 * Models.
 */
import { Usuario } from '../../models';
import { TipoUsuario } from '../../../tipos-usuarios';
import { TipoCliente } from '../../../tipos-clientes';

/**
 * Validators.
 */
import { EmailUniqueValidate } from '../../validators';
import { personNameValidator } from '../../../shared';

@Component({
    selector: 'app-usuario-update',
    templateUrl: './usuario-update.component.html',
    styleUrls: ['./usuario-update.component.scss'],
    animations: [moltenAnimation]
})
export class UsuarioUpdateComponent implements OnInit, OnDestroy {

    /**
     * Campos privados.
     */
    private id_usuario: number;
    private usuario: Usuario;
    private queryTipoUsuario: Subscription;
    private queryTipoCliente: Subscription;

    /**
     * Campos públicos.
     */
    public tiposUsuarios: Array<TipoUsuario>;
    public tiposClientes: Array<TipoCliente>;
    public formUpdate: FormGroup;

    /**
     * Constructor de la clase.
     * @param _usuarioService UsuarioService
     * @param _tipoUsuarioService TipoUsuarioService
     * @param _tipoClienteService TipoClienteService
     * @param _emailUniqueValidate EmailUniqueValidate
     * @param router Router
     * @param activatedRoute ActivatedRoute
     * @param titleCasePipe: TitleCasePipe
     * @param lowerCasePipe: LowerCasePipe
     * @param formBuilder: FormBuilder
     */
    constructor(
        private _usuarioService: UsuarioService,
        private _tipoUsuarioService: TipoUsuarioService,
        private _tipoClienteService: TipoClienteService,
        private _emailUniqueValidate: EmailUniqueValidate,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleCasePipe: TitleCasePipe,
        private lowerCasePipe: LowerCasePipe,
        public formBuilder: FormBuilder
    ) {
        this.usuario = new Usuario();
        this.getForm();
    }

    /**
     * Obtiene el id del usuario.
     */
    get id(): AbstractControl {
        return this.formUpdate.get('id');
    }

    /**
     * Obtiene el nombre del usuario.
     */
    get nombre(): AbstractControl {
        return this.formUpdate.get('nombre');
    }

    /**
     * Obtiene el apellido paterno del usuario.
     */
    get paterno(): AbstractControl {
        return this.formUpdate.get('paterno');
    }

    /**
     * Obtiene el apellido materno del usuario.
     */
    get materno(): AbstractControl {
        return this.formUpdate.get('materno');
    }

    /**
     * Obtiene el correo del usuario.
     */
    get correo(): AbstractControl {
        return this.formUpdate.get('correo');
    }

    /**
     * Obtiene el tipo de usuario.
     */
    get tipo_usuario(): AbstractControl {
        return this.formUpdate.get('tipo_usuario');
    }

    /**
     * Obtiene el tipo de cliente.
     */
    get tipo_cliente(): AbstractControl {
        return this.formUpdate.get('tipo_cliente');
    }

    /**
     * Construye el formulario de actualización.
     */
    private getForm(): void {
        this.formUpdate = this.formBuilder.group({
            'id': [null],
            'nombre': [null, Validators.compose([Validators.required, Validators.minLength(3), personNameValidator])],
            'paterno': [null, Validators.compose([Validators.required, Validators.minLength(3), personNameValidator])],
            'materno': [null, Validators.compose([Validators.minLength(3), personNameValidator])],
            'correo': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'tipo_usuario': [null, Validators.compose([Validators.required])],
            'tipo_cliente': [null, Validators.compose([Validators.required])]
        });
        this.handleFormChanges();
    }

    /**
     * Validaciones asíncronas de campos únicos.
     */
    private handleFormChanges(): void {
        this.correo.valueChanges.subscribe(
            correo => {
                // Valida la existencia del título asíncronamente.
                const id = this.formUpdate.get('id').value;
                if (correo !== 'undefined' && correo !== null) {
                    this.correo.setAsyncValidators(this._emailUniqueValidate.userValidator(this._usuarioService, id));
                }
            }
        );
    }

    /**
     * Método de inicio de la clase.
     */
    ngOnInit() {
        this.getTiposUsuarios();
        this.getTiposClientes();
        this.getUsuario();
    }

    /**
     * Obtiene los tipos de usuarios.
     */
    public getTiposUsuarios(): void {
        this.queryTipoUsuario = this._tipoUsuarioService.getUsuarios().subscribe(
            (response: any) => {
                this.tiposUsuarios = response.tipos;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    /**
     * Obtiene los tipos de clientes.
     */
    public getTiposClientes(): void {
        this.queryTipoCliente = this._tipoClienteService.getClientes().subscribe(
            (response: any) => {
                this.tiposClientes = response.tipos;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    /**
     * Determina si se ha pegado el valor del correo para su validación.
     */
    public onEmailPaste(): void {
        this.correo.setValue('');
    }

    /**
     * Obtiene los datos de un usuario según su id.
     */
    private getUsuario(): void {
        this.activatedRoute.params.forEach((params: Params) =>  {
            if (!params['id']) {
                this.router.navigate(['/error404']);
            }

            this.id_usuario = parseInt(params['id']);
            this._usuarioService.getUsuarioById(this.id_usuario).subscribe(
                (response: any) => {
                    if (!response.usuario) {
                        this.router.navigate(['/']);
                      } else {
                        this.usuario = response.usuario;
                        this.id.setValue(this.usuario.id);
                        this.nombre.setValue(this.usuario.nombre);
                        this.paterno.setValue(this.usuario.apellido_paterno);
                        this.materno.setValue(this.usuario.apellido_materno);
                        this.correo.setValue(this.usuario.correo);
                        this.tipo_usuario.setValue(this.usuario.id_tipo_usuario);
                        this.tipo_cliente.setValue(this.usuario.id_tipo_cliente);
                      }
                },
                error => {
                    console.log(<any>error);
                    this.router.navigate(['/']);
                }
            );
        });
    }

    /**
     * Modifica un usuario específico.
     */
    public onSubmit(): void {
        if (this.formUpdate.valid) {
            const data = this.formUpdate.getRawValue();
            this.formUpdate.disable();
            this.updateCliente(data);
        }
    }

    /**
     * Actualiza un usuario.
     * @param data formUpdate
     */
    private updateCliente(data: any): void {
        const id = data.id;
        this.usuario.nombre = this.titleCasePipe.transform(this.lowerCasePipe.transform(data.nombre.trim()));
        this.usuario.apellido_paterno = this.titleCasePipe.transform(this.lowerCasePipe.transform(data.paterno.trim()));
        this.usuario.apellido_materno = this.titleCasePipe.transform(this.lowerCasePipe.transform(data.materno.trim()));
        this.usuario.correo = data.correo;
        this.usuario.id_tipo_usuario = data.tipo_usuario;
        this.usuario.id_tipo_cliente = data.tipo_cliente;

        this._usuarioService.updateUsuario(id, this.usuario).subscribe(
            response => {
                Swal.fire({
                    type: 'success',
                    text: 'Usuario modificado correctamente.',
                    confirmButtonColor: '#1e88e5',
                    confirmButtonText: 'Aceptar',
                    allowEnterKey: false,
                    allowOutsideClick: false
                });
                this.router.navigate(['/usuarios']);
            },
            error => {
                console.log(error);
                Swal.fire({
                    type: 'error',
                    text: 'Error al modificar el usuario. Si el problema persiste, contacte a soporte',
                    confirmButtonColor: '#1e88e5',
                    confirmButtonText: 'Aceptar',
                    allowEnterKey: false,
                    allowOutsideClick: false
                });
                this.router.navigate(['/usuarios']);
            }
        );
    }

    ngOnDestroy(): void {
        this.queryTipoUsuario.unsubscribe();
        this.queryTipoCliente.unsubscribe();
    }
}
