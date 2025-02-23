import { AbstractControl, ValidationErrors } from '@angular/forms';

export const customerNumberValidator = (control: AbstractControl): ValidationErrors | null => {
  const valid = /^[0-9]{9}$/.test(control.value);
  return valid ? null : { customerNumber: true };
};
