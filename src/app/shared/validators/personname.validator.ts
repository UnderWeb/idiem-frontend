import { AbstractControl } from '@angular/forms';

export function personNameValidator(control: AbstractControl) {
    if (control.value && control.value.length > 3) {
        const pattern = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑàèìòùÀÈÌÒÙ' ']+$");
        return (!pattern.test(control.value)) ? { 'personname': true } : null;
    } else {
        return null;
    }
}
