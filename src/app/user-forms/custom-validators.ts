import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function minValidatorFactory(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    if( control && control.value < min ) {
      return { 'min': `Number must be at least ${min}` }
    } else {
      return null;
    }
  };
}

export function maxValidatorFactory(max: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    if( control && control.value > max ) {
      return { 'max': `Number must be less than ${max}` }
    } else {
      return null;
    }
  };
}

export function passwordValidatorFactory(controlName: string, validatorName: string): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} => {
    return group.get(controlName).value === group.get(validatorName).value ? null : { 'mismatch': true };
  };
}