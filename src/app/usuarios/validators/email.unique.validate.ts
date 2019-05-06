import { AbstractControl } from '@angular/forms';
import { UsuarioService } from '../services';
import { map } from 'rxjs/operators';

export class EmailUniqueValidate {

    /**
     * Valida el registro único del usuario mediante su correo electrónico.
     * @param _usuarioService UsuarioService
     * @param id number
     */
    userValidator(_usuarioService: UsuarioService, id?: number) {
        return (control: AbstractControl) => {
            return _usuarioService.uniqueEmail(control.value, id).pipe(map(
                (response: any) => {
                    return response.valid ? { existsUser: true } : null;
                }
            ));
        }
    }
}
