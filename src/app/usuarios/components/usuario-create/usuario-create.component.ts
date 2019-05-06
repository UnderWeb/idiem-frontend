import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
    selector: 'app-usuario-create',
    templateUrl: './usuario-create.component.html',
    styleUrls: ['./usuario-create.component.scss'],
    animations: [moltenAnimation]
})
export class UsuarioCreateComponent implements OnInit, OnDestroy {

    /**
     * Campos privados.
     */
    private usuario: Usuario;
    private queryTipoUsuario: Subscription;
    private queryTipoCliente: Subscription;

    /**
     * Campos públicos.
     */
    public tiposUsuarios: Array<TipoUsuario>;
    public tiposClientes: Array<TipoCliente>;
    public formCreate: FormGroup;

    /**
     * Constructor de la clase.
     * @param _usuarioService UsuarioService
     * @param _tipoUsuarioService TipoUsuarioService
     * @param _tipoClienteService TipoClienteService
     * @param _emailUniqueValidate EmailUniqueValidate
     * @param router Router
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
        private titleCasePipe: TitleCasePipe,
        private lowerCasePipe: LowerCasePipe,
        public formBuilder: FormBuilder
    ) {
        this.usuario = new Usuario();
        this.getForm();
    }

    /**
     * Obtiene el correo del usuario.
     */
    get correo(): AbstractControl {
        return this.formCreate.get('correo');
    }

    /**
     * Construye el formulario de creación.
     */
    private getForm(): void {
        this.formCreate = this.formBuilder.group({
            'nombre': [null, Validators.compose([Validators.required, Validators.minLength(3), personNameValidator])],
            'paterno': [null, Validators.compose([Validators.required, Validators.minLength(3), personNameValidator])],
            'materno': [null, Validators.compose([Validators.required, Validators.minLength(3), personNameValidator])],
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
                // Valida la existencia del correo asíncronamente.
                if (correo !== 'undefined' && correo !== null) {
                    this.correo.setAsyncValidators(this._emailUniqueValidate.userValidator(this._usuarioService, null));
                }
            }
        );
    }

    ngOnInit(): void {
        this.getTiposUsuarios();
        this.getTiposClientes();
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
     * Ingresa un nuevo usuario.
     */
    onSubmit(): void {
        if (this.formCreate.valid) {
            const data = this.formCreate.getRawValue();
            this.formCreate.disable();
            this.createUsuario(data);
        }
    }

    /**
     * Crea un nuevo usuario.
     * @param data formCreate
     */
    private createUsuario(data: any): void {
        this.usuario.nombre = this.titleCasePipe.transform(this.lowerCasePipe.transform(data.nombre.trim()));
        this.usuario.apellido_paterno = this.titleCasePipe.transform(this.lowerCasePipe.transform(data.paterno.trim()));
        this.usuario.apellido_materno = this.titleCasePipe.transform(this.lowerCasePipe.transform(data.materno.trim()));
        this.usuario.correo = this.lowerCasePipe.transform(data.correo.trim());
        this.usuario.id_tipo_usuario = data.tipo_usuario;
        this.usuario.id_tipo_cliente = data.tipo_cliente;

        this._usuarioService.createUsuario(this.usuario).subscribe(
            response => {
                console.log(response);
                Swal.fire({
                    type: 'success',
                    text: 'Usuario ingresado correctamente',
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
                    text: 'Error al ingresar el usuario. Si el problema persiste, contacte a soporte',
                    confirmButtonColor: '#1e88e5',
                    confirmButtonText: 'Continuar',
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
