import { AbstractControl } from '@angular/forms';

export function rutValidator(control: AbstractControl) {

    if (control.value && control.value.length > 3) {
        let inputRut = (control.value).split('.').join('');

        if (inputRut.length > 7 || inputRut.length < 11) {
            // Sepración Rut y Dv
            let rutArray = inputRut.split('-');
            let rut = rutArray[0]
            let dv = rutArray[1].toUpperCase();

            // Calcular Dígito Verificador
            let suma = 0;
            let multiplo = 2;

            for (let i = 1; i <= rut.length; i++) {
                let index = multiplo * +inputRut.charAt(rut.length - i);
                suma = suma + index;
                if (multiplo < 7) {
                    multiplo = multiplo + 1;
                } else {
                    multiplo = 2;
                }
            }

            let dvEsperado = 11 - (suma % 11);
            dv = (dv == 'K') ? '10' : dv;
            dv = (dv == '0') ? '11' : dv;

            // Validación
            if (dvEsperado == +dv) {
                return null;
            } else {
                return {
                    invalidRut: true
                }
            }
        } else {
            return {
                invalidRut: true
            }
        }
    } else {
        return null;
    }
}
