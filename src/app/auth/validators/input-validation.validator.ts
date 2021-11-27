import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const fnSamePass: ValidatorFn = (control: AbstractControl):
    ValidationErrors | null => {

    const pass1Control = control.get('password');
    const pass2Control = control.get('password2');

  return pass1Control?.value === pass2Control?.value ? null: { noSonIguales: true }
}
