import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatRut'
})

export class FormatRutPipe implements PipeTransform {
    public transform(value: any) {
        if (value != null && value != '') {
            let sRutFormateado = '';
            let sDV = '';
            let sRut = this.unformatRut(value);
            sDV = sRut.charAt(sRut.length - 1);
            sRut = sRut.substr(0, sRut.length - 1);

            if (sRut.length > 1) {
                
            }

            while (sRut.length > 3) {
                sRutFormateado = '.' + sRut.substr(sRut.length - 3) + sRutFormateado;
                sRut = sRut.substring(0, sRut.length - 3);
            }

            sRutFormateado = sRut + sRutFormateado;
            if (sRutFormateado !== '' && sDV) {
                sRutFormateado += '-' + sDV;
            } else if (sDV) {
                sRutFormateado += sDV;
            }

            return sRutFormateado;
        }
    }

    private unformatRut(rut) {
        if (rut != null && rut != '') {
            let strRut = rut.toString();

            while (strRut.indexOf('.') !== -1) {
                strRut = strRut.replace('.', '');
            }

            while (strRut.indexOf('-') !== -1) {
                strRut = strRut.replace('-', '');
            }

            return strRut;
        }
    }
}
